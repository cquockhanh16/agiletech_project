import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import logo from "../../shared/Images/logo.png";
import {
  createData,
  deleteData,
  fetchData,
  handleSessionExpired,
  updateData,
} from "../../services/apiServices";
import Paginate from "../../shared/UIElements/Paginate";
import { toast } from "react-toastify";
import { RiPencilLine } from "react-icons/ri";
import { ImBin2 } from "react-icons/im";

interface Post {
  id: string;
  title: string;
  tags: { tag: string }[];
  description: string;
}

interface Data {
  current_page?: number;
  page_size?: 10;
  posts: Post[];
  total?: number;
  total_page?: number;
}

interface LoginProps {
  onLogout: () => void;
}

const Profile: React.FC<LoginProps> = ({ onLogout }) => {
  const [data, setData] = useState<Data>();
  const [tags, setTags] = useState<string[]>();
  const [error, setError] = useState<unknown>();
  const [editPostId, setEditPostId] = useState<number | string>("");
  const [showFormEdit, setShowFormEdit] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const fetchTags = async () => {
      const res: string[] = await fetchData("/posts/tags");
      setTags(res);
    };
    const fetchPosts = async () => {
      const res: Data[] = await fetchData("/posts");
      setData(res[0]);
    };
    fetchPosts();
    fetchTags();
  }, []);
  const addPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleRef.current && tagsRef.current) {
      try {
        let title = titleRef.current.value.trim();
        if (!title) {
          toast.error("Title cannot empty!!");
          return;
        }
        let tags = tagsRef.current.value.trim();
        let id = "p-" + Date.now().toString();
        let post = {
          id,
          title,
          description: title + "-" + tags,
          tags: [{ tag: tags }],
        };
        const res: boolean = await createData("/posts", post);
        if (res) {
          setData((prev) => ({
            ...prev,
            posts: [post, ...(prev?.posts || [])],
          }));
          toast.success("Add post successfully!!");
          titleRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      setError("Not get value in input");
      console.log(error);
    }
  };

  const deletePostById = async (id: string | number) => {
    try {
      const res = await deleteData(id);
      if (res) {
        toast.info("Delete post successfully!!");
        setData((prev) => ({
          ...prev,
          posts: [...(prev?.posts.filter((item) => item.id != id) || [])],
        }));
      } else {
        toast.error("Delete post, ID: " + id + " unsuccessfully!!");
      }
    } catch (error) {}
  };

  const editPost = (id: string | number) => {
    let post = data?.posts.find((item) => item.id == id);
    if (titleRef.current && post?.title) {
      titleRef.current.value = post.title.toString();
      setShowFormEdit(true);
      setEditPostId(id);
    }
  };

  const updatePostHandler = async () => {
    try {
      if (titleRef.current && tagsRef.current) {
        let title = titleRef.current.value.trim();
        if (!title) {
          toast.error("Title cannot empty!!");
          return;
        }
        let tags = tagsRef.current.value.trim();
        const res = await updateData(editPostId, {
          title,
          description: title + "-" + tags,
          tags: [{ tag: tags }],
        });
        if (res) {
          let temp = data?.posts || [];
          let index = temp?.findIndex((p) => p.id == editPostId) || -1;
          if (index >= 0) {
            temp[index] = { id: editPostId, ...res };
          }
          setData((prev) => ({
            ...prev,
            posts: [...temp],
          }));
          toast.info("Update post success!!");
          setShowFormEdit(false);
        } else {
          toast.info("Update post unsuccess!!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    handleSessionExpired();
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  return (
    <div className='profile'>
      <div className='setting'>
        <div>
          <Link to={"/"}>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <p>Posts</p>
        <p>
          <button onClick={logoutHandler}>Logout</button>
        </p>
      </div>
      <div className='profile-action'>
        <div className='action'>
          <form onSubmit={addPostHandler}>
            <button type='submit'>Add new</button>
          </form>
          <div>
            <input type='text' ref={titleRef} placeholder='Title' />
            <select ref={tagsRef}>
              {tags &&
                tags.map((item, index) => {
                  return <option key={"tag-" + index}>{item}</option>;
                })}
            </select>
          </div>
        </div>
        {showFormEdit && (
          <div className='group-action'>
            <button onClick={() => updatePostHandler()}>Update</button>
            <button onClick={() => setShowFormEdit(false)}>Cancel</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.posts.map((item, index) => {
                return (
                  <tr key={item.id + index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      {typeof item.tags === "object"
                        ? item.tags.map((item) => item.tag).join(", ")
                        : item.tags}
                    </td>
                    <td>
                      <button>
                        <RiPencilLine
                          onClick={() => editPost(item.id)}
                          className='action-icon'
                        />
                      </button>
                      <button onClick={() => deletePostById(item.id)}>
                        <ImBin2 className='action-icon' />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <Paginate
            setData={setData}
            data={data || { posts: [], total_page: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
