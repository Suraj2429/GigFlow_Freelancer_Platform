import axios from "axios";
import type { User, Gig, Bid, Notification } from "../types";

/**
 * Axios instance
 * JWT is handled via HttpOnly cookies (sent automatically)
 */
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export const api = {

  auth: {
    register: async (
      name: string,
      email: string,
      password: string
    ): Promise<User> => {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password
      });
      return res.data;
    },

    login: async (email: string, password: string): Promise<User> => {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password
      });
      return res.data;
    },

    logout: async (): Promise<void> => {
      await axiosInstance.post("/auth/logout");
    },

    getCurrentUser: async (): Promise<User | null> => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch {
        return null;
      }
    }
  },

 
  gigs: {
    fetchAll: async (query?: string): Promise<Gig[]> => {
      const res = await axiosInstance.get("/gigs", {
        params: { search: query }
      });
      return res.data;
    },

    create: async (
      title: string,
      description: string,
      budget: number
    ): Promise<Gig> => {
      const res = await axiosInstance.post("/gigs", {
        title,
        description,
        budget
      });
      return res.data;
    },

    fetchById: async (id: string): Promise<Gig> => {
      const res = await axiosInstance.get(`/gigs/${id}`);
      return res.data;
    }
  },


  bids: {
    submit: async (
      gigId: string,
      message: string,
      price: number
    ): Promise<Bid> => {
      const res = await axiosInstance.post("/bids", {
        gigId,
        message,
        price
      });
      return res.data;
    },

    fetchByGig: async (gigId: string): Promise<Bid[]> => {
      const res = await axiosInstance.get(`/bids/${gigId}`);
      return res.data;
    }
  },

  hiring: {
    hire: async (bidId: string): Promise<boolean> => {
      await axiosInstance.patch(`/bids/${bidId}/hire`);
      return true;
    }
  },

  notifications: {
    fetch: async (): Promise<Notification[]> => {
      const res = await axiosInstance.get("/notifications");
      return res.data;
    }
  }
};

export default api;
