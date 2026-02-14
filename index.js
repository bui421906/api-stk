const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== CONFIG =====
const API_URL =
  "https://pmbodergw.dsrcgoms.net/payment/np?version=v2&token=485d069232fb1e45865ace9caad864f0";

const X_TOKEN = "485d069232fb1e45865ace9caad864f0";
const X_FG_ID = "9c74b62f5cf4291e3e1cd3852bb9ddd1";

// ===== Axios instance chống bị chặn =====
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-TOKEN": X_TOKEN,
    "X-FG-ID": X_FG_ID,
    Origin: "https://v.hitclub.so",
    Referer: "https://v.hitclub.so/",
    "User-Agent": "Mozilla/5.0",
  },
});

// Trang chủ test
app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// Route gọi API ngoài
app.get("/payment", async (req, res) => {
  try {
    const response = await axiosInstance.get(API_URL);
    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({
      error: "Không gọi được API",
      detail: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server chạy cổng " + PORT);
});
