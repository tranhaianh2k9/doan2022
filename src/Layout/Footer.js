import React from 'react'

const Footer = () => {
  return (
    <footer>
  <div className="container-footer">
    <div className="about">
      <h2>Về Chúng Tôi</h2>
      <ul className="social-icon">
        <li><a href><i className="fa-brands fa-facebook" /></a></li>
        <li><a href><i className="fa-brands fa-discord" /></a></li>
        <li><a href><i className="fa-brands fa-github" /></a></li>
        <li><a href><i className="fa-brands fa-youtube" /></a></li>
      </ul>
    </div>
    {/*Kết Thúc Nội Dung Đường Dẫn*/}
    {/*Bắt Đâu Nội Dung Liên Hệ*/}
    <div className="contact">
      <h2>Thông Tin Liên Hệ</h2>
      <ul className="info">
        <li>
          <span><i className="fa fa-map-marker" /></span>
          <span>Đại Học Phương Đông<br />
            Minh Khai, Hai Bà Trưng, Hà Nội</span>
        </li>
        <li>
          <span><i className="fa fa-phone" /></span>
          <p>
            <a className="link-info" href="#">+84 123 456 789</a>
            <br />
            <a className="link-info" href="#">+84 987 654 321</a></p>
        </li>
        <li>
          <span><i className="fa fa-envelope" /></span>
          <p><a className="link-info" href="#">diachiemail@gmail.com</a></p>
        </li>
      </ul>
    </div>
    {/*Kết Thúc Nội Dung Liên Hệ*/}
  </div>
</footer>
  )
}

export default Footer