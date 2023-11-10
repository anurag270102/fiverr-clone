import React from "react";
import './footer.scss';
const Footer = () => {
    return ([
        <div className="footer">
            <div className="container">
                <div className="top">
                    <div className="item">
                        <h2>Categories</h2>
                        <span>Graphics & Design</span>
                        <span> Digital Marketing</span>
                        <span>Writing & Translation</span>
                        <span>Video & Animation</span>
                        <span> Music & Audio</span>
                        <span> Programming & Tech</span>
                        <span> Data</span>
                        <span>Business</span>
                        <span>Lifestyle</span>
                        <span>Photography</span>
                        <span> End-to-End Projects</span>
                        <span>Sitemap</span>
                    </div>
                    <div className="item">
                        <h2>About</h2>
                        <span>Careers</span>
                        <span>Press & News</span>
                        <span>Partnerships</span>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span> Intellectual Property Claims</span>
                        <span>Investor Relations</span>
                    </div>
                    <div className="item">
                        <h2>Support</h2>
                        <span>Help & Support</span>
                        <span>Trust & Safety</span>
                        <span>Selling on Fiverr</span>
                        <span> Buying on Fiverr</span>
                        <span>Fiverr Guides</span>
                    </div>
                    <div className="item">
                        <h2>Community</h2>
                        <span>Customer Success Stories</span>
                        <span>Community Hub</span>
                        <span>Forum</span>
                        <span>Events</span>
                        <span> Blog</span>
                        <span>Influencers</span>
                        <span>Affiliates</span>
                        <span>Podcast</span>
                        <span> Invite a Friend</span>
                        <span> Become a Seller</span>
                        <span>Community Standards</span>
                    </div>
                    <div className="item">
                        <h2>More From Fiverr</h2>
                        <span>Fiverr Enterprise</span>
                        <span> Fiverr Business</span>
                        <span>Fiverr Pro</span>
                        <span> Fiverr Logo Maker</span>
                        <span> Get Inspired </span>
                        <span>Fiverr Select</span>
                        <span>ClearVoice</span>
                            Content Marketing
                        <span>Fiverr Workspace</span>
                            Invoice Software
                        <span>Learn</span>
                            Online Courses
                        <span> Working Not Working</span>
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <h2>fiverr</h2>
                        <span>© Fiverr International Ltd. 2023</span>
                    </div>
                    <div className="right">
                        <div className="social">
                            <a href="https://twitter.com/fiverr"> <img src="/images/twitter.png" alt=""  /></a>
                            <a href="https://www.facebook.com/Fiverr/"> <img src="/images/facebook.png" alt=""  /></a>
                            <a href="https://www.linkedin.com/company/fiverr-com"><img src="/images/linkedin.png" alt=""  /></a>
                            <a href="https://www.pinterest.com/fiverr/"> <img src="/images/pinterest.png" alt=""  /></a>
                            <a href="https://www.instagram.com/fiverr/"> <img src="/images/instagram.png" alt=""  /></a> 
                        </div>
                        <div className="link">
                            <img src="/images/language.png" alt="" />
                            <span>English</span>
                        </div>
                        <div className="link">
                            <img src="/images/coin.png" alt="" />
                            <span>USD</span>
                        </div>
                        <img src="/images/accessibility.png" alt="" />
                        
                    </div>
                </div>
            </div>
        </div>
    ]);
}
export default Footer;
