import ReactPaginate from "react-paginate";

import React from "react";
import { fetchData } from "../../services/apiServices";
import "./Paginate.css";

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

interface Props {
  setData: (arg: Data) => void;
  data: Data;
}

const Paginate: React.FC<Props> = ({ setData, data }) => {
  const handlePageClick = async (item: any) => {
    console.log(item);
    const res: Data[] = await fetchData(
      `/posts?title=&page=${+item.selected + 1}`
    );
    setData(res[0]);
    console.log(res[0]);
  };
  return (
    <ReactPaginate
      nextLabel='next >'
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={data?.total_page || 1}
      previousLabel='< previous'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      breakLabel='...'
      breakClassName='break-item'
      breakLinkClassName='break-link'
      containerClassName='pagination'
      activeClassName='active'
      disabledClassName='disabled'
    />
  );
};

export default Paginate;
