import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import "./Home.scss";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  // PAGINATION
  let limit = 4;
  let numOfpages = Math.ceil(allPosts.length / limit);
  let arrBtns = [];
  for (let i = 1; i <= numOfpages; i++) {
    arrBtns.push(i);
  }

  const fetchPosts = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/news?_page=${page}&_limit=${limit}`
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/news");
        setAllPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);
  return (
    <div className="Home">
      <header>
        <div className="container">
          <nav>
            <div className="nav-links">
              <a href="#">Home</a>
              <a href="#">Business</a>
              <a href="#">Entertainment</a>
              <a href="#">General</a>
              <a href="#">Health</a>
              <a href="#">Science</a>
              <a href="#">Sports</a>
              <a href="#">Technology</a>
            </div>
          </nav>
        </div>
      </header>
      <div className="container">
        <div className="par">
          <h1>Our Latest</h1>
        </div>
        <div className="cards">
          {posts.map((post, index) => (
            <div key={index} className="card">
              <div className="img">
                <p>{post.category}</p>
              </div>
              <div className="card-body">
                <h1>{post.title}</h1>
                <div className="card-foter">
                  <p>{post.autor}</p>
                  <p>{post.date}</p>
                </div>
                <NavLink to="more">
                  <button className="more">Read more</button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          {arrBtns?.map((item) => (
            <button
              className="pagination"
              key={item}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
