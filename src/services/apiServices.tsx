import { AuthResponse } from "../interface/authResponse";

const apiBaseUrl = "https://api-test-web.agiletech.vn"; // Thay bằng URL API của bạn

export interface DataType {
  id: number;
  name: string;
  // Các trường dữ liệu khác
}

export const saveTokens = (data: AuthResponse) => {
  const accessTokenExpiration = Date.now() + 60 * 1000; // 1 ngày
  const refreshTokenExpiration = Date.now() + 24 * 60 * 60 * 1000; // 5 ngày

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem(
    "accessTokenExpiration",
    accessTokenExpiration.toString()
  );
  localStorage.setItem(
    "refreshTokenExpiration",
    refreshTokenExpiration.toString()
  );
};

export const isTokenExpired = (expiration: string | null): boolean => {
  if (expiration) {
    return Date.now() > Number(expiration);
  }
  return true;
};

export const handleSessionExpired = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpiration");
  localStorage.removeItem("refreshTokenExpiration");
  // Redirect to login page or show an error message
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await fetch(`${apiBaseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: AuthResponse = await response.json();
    saveTokens(data); // Save the new tokens and expiration times
    console.log("Token refreshed successfully");
  } catch (error) {
    console.error("Refresh token error:", error);
    handleSessionExpired();
  }
};

export const signin = async <T,>(url: string, username: string): Promise<T> => {
  try {
    const response = await fetch(`${apiBaseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || response.status !== 201) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.code === 401) {
      throw new Error(`Login unsuccess!!`);
    }

    return data as T;
  } catch (error) {
    throw error;
  }
};

export const logout = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiBaseUrl}${url}`, {
      method: "DELETE",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.code === 401) {
      throw new Error(`Login unsuccess!!`);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const checkAuthentication = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const checkToken = async () => {
  const accessTokenExpiration = localStorage.getItem("accessTokenExpiration");
  const refreshTokenExpiration = localStorage.getItem("refreshTokenExpiration");

  if (isTokenExpired(accessTokenExpiration)) {
    if (isTokenExpired(refreshTokenExpiration)) {
      handleSessionExpired();
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    } else {
      await refreshAccessToken();
    }
  }
};

export const fetchData = async <T,>(url: string): Promise<T[]> => {
  await checkToken();
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${apiBaseUrl}${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok || response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [data] as T[];
    }

    return data as T[];
  } catch (error) {
    throw error;
  }
};

export const createData = async (url: string, body: any) => {
  await checkToken();
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${apiBaseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create new data");
  }

  const data = await response.json();
  console.log(data);
  return true;
};

export const updateData = async (
  id: number | string,
  updatedData: Partial<any>
): Promise<any> => {
  await checkToken();
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${apiBaseUrl}/posts/${id}`, {
    method: "PATCH", // Hoặc 'PATCH' nếu chỉ cập nhật một phần
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update data with id: ${id}`);
  }

  const data = await response.json();
  return data;
};

// Hàm xóa dữ liệu theo ID
export const deleteData = async (id: string | number) => {
  await checkToken();
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${apiBaseUrl}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete data with id: ${id}`);
  }
  return true;
};
