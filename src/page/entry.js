import { React, useState, useRef, useEffect  } from "react";
import { Link } from 'react-router-dom';
import "../css/entry.css";
import "../css/scroller.css";

import logo from '../icon/sloth-statue.png';
import mPhoto0 from '../photo/profile0.jpg';
import mPhoto1 from '../photo/profile1.jpg';
import mPhoto2 from '../photo/profile2.jpg';
import mPhoto3 from '../photo/profile3.jpg';
import mPublications from "../json/publications.json";
import mUnpublished from "../json/unpublished.json";


const github_icon = <svg t="1740485110464" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10726" width="16" height="16"><path d="M511.957333 21.333333C241.024 21.333333 21.333333 240.981333 21.333333 512c0 216.832 140.544 400.725333 335.573334 465.664 24.490667 4.394667 32.256-10.069333 32.256-23.082667 0-11.690667 0.256-44.245333 0-85.205333-136.448 29.610667-164.736-64.64-164.736-64.64-22.314667-56.704-54.4-71.765333-54.4-71.765333-44.586667-30.464 3.285333-29.824 3.285333-29.824 49.194667 3.413333 75.178667 50.517333 75.178667 50.517333 43.776 75.008 114.816 53.333333 142.762666 40.789333 4.522667-31.658667 17.152-53.376 31.189334-65.536-108.970667-12.458667-223.488-54.485333-223.488-242.602666 0-53.546667 19.114667-97.322667 50.517333-131.669334-5.034667-12.330667-21.930667-62.293333 4.778667-129.834666 0 0 41.258667-13.184 134.912 50.346666a469.802667 469.802667 0 0 1 122.88-16.554666c41.642667 0.213333 83.626667 5.632 122.88 16.554666 93.653333-63.488 134.784-50.346667 134.784-50.346666 26.752 67.541333 9.898667 117.504 4.864 129.834666 31.402667 34.346667 50.474667 78.122667 50.474666 131.669334 0 188.586667-114.730667 230.016-224.042666 242.090666 17.578667 15.232 33.578667 44.672 33.578666 90.453334v135.850666c0 13.141333 7.936 27.605333 32.853334 22.869334C862.250667 912.597333 1002.666667 728.746667 1002.666667 512 1002.666667 240.981333 783.018667 21.333333 511.957333 21.333333z" p-id="10727"></path></svg>;
const linkedin_icon = <svg t="1740484183943" className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2041" width="15" height="15"><path d="M872.405333 872.618667h-151.637333v-237.610667c0-56.661333-1.152-129.578667-79.018667-129.578667-79.061333 0-91.136 61.653333-91.136 125.397334v241.792H398.976V384h145.664v66.602667h1.962667c20.352-38.4 69.845333-78.933333 143.786666-78.933334 153.642667 0 182.058667 101.12 182.058667 232.746667v268.202667zM227.712 317.141333a87.978667 87.978667 0 0 1-88.021333-88.106666 88.064 88.064 0 1 1 88.021333 88.106666z m76.032 555.477334H151.68V384h152.064v488.618667zM948.266667 0H75.562667C33.792 0 0 33.024 0 73.770667v876.458666C0 991.018667 33.792 1024 75.562667 1024h872.576C989.866667 1024 1024 991.018667 1024 950.229333V73.770667C1024 33.024 989.866667 0 948.138667 0h0.128z" p-id="2042"></path></svg>;
const cv_icon = <svg t="1740484740144" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M715.2 752.9H293.3c-7.7 0-13.9 6.2-13.9 13.9s6.2 13.9 13.9 13.9h421.9c7.7 0 13.9-6.2 13.9-13.9-0.1-7.7-6.3-13.9-13.9-13.9zM715.2 638.1H293.3c-7.7 0-13.9 6.2-13.9 13.9s6.2 13.9 13.9 13.9h421.9c7.7 0 13.9-6.2 13.9-13.9-0.1-7.7-6.3-13.9-13.9-13.9z" p-id="8715"></path><path d="M915.2 157.4L765.6 10c-6.5-6.4-15.2-10-24.4-10H149.1c-19.2 0-34.7 15.5-34.7 34.7v954.6c0 19.2 15.5 34.7 34.7 34.7h741.7c19.2 0 34.7-15.5 34.7-34.7V182.1c0.1-9.3-3.7-18.2-10.3-24.7zM183.8 954.6V69.3h536.6v113.1c0 11.5 9.3 20.8 20.8 20.8h114.9v751.3H183.8z" p-id="8716"></path><path d="M426.4 520.1c6.6 7.4 15.1 13.1 25.3 17.3 10.3 4.2 22.7 6.2 37.1 6.2 12 0 23.1-1.6 33.3-4.9 10.2-3.3 17.6-8.1 22.3-14.5 3.2-4.4 4.5-8.7 4-13-0.5-4.3-2.1-8-4.8-11-2.7-3.1-6.3-5-10.8-5.9-4.6-0.9-9.4 0.1-14.5 2.8-3 1.7-7 3.3-12.1 4.6-5.1 1.3-10.9 2-17.3 2-12.8 0-22.3-3.8-28.7-11.4-6.4-7.6-9.5-17.9-9.5-30.9V435c0-13 3.2-23.3 9.5-30.9 6.4-7.6 15.9-11.4 28.7-11.4 6.4 0 11.8 0.8 16.2 2.4 4.4 1.6 8.4 3.4 12.1 5.3 6.9 3.4 12.7 4.4 17.5 2.9 4.8-1.5 8.3-4 10.6-7.7 2.3-3.7 3.4-7.9 3.1-12.7-0.2-4.8-2-8.8-5.1-11.9-5.7-5.7-13-10.1-22.1-13.4-9.1-3.3-19.9-5-32.4-5-14.5 0-26.9 2.1-37.1 6.3-10.3 4.2-18.7 9.9-25.3 17.3-6.6 7.3-11.5 15.9-14.5 25.5-3.1 9.7-4.6 20.1-4.6 31.1v30.9c0 11 1.5 21.4 4.6 31.1a68 68 0 0 0 14.5 25.3zM725.6 353.6c-5.9-1.5-11.2-1-16 1.5-4.8 2.4-7.9 5.8-9.4 9.9L659 490l-41.5-125c-1.2-4.1-4.2-7.5-9-9.9-4.8-2.4-10.2-2.9-16.3-1.5-6.6 1.7-11.3 4.8-14 9.4-2.7 4.6-3.4 8.9-2.2 13.1l59.2 152.2c1.2 4.2 4 7.8 8.3 10.8 4.3 3.1 9.5 4.6 15.6 4.6 5.9 0 11-1.5 15.4-4.6 4.4-3 7.2-6.7 8.4-10.8l59.2-152.2c1.2-4.2 0.4-8.5-2.4-13.1-2.7-4.5-7.4-7.7-14.1-9.4z" p-id="8717"></path></svg>;

function Author( {author, idx} ) {
    return <span className={(author == "Chang Chen")? "self-author":"co-author"}>
        {author}
        {(idx == 0) && <sup>1</sup>}
    </span>;
};


function Paper( { title, authors, link, photo, conference, year, published } ) {
    const authorship = authors.map( (author, idx) => {
        return (
            <span>
                <Author author={author} idx={idx}></Author>
                {(idx != (authors.length-1)) && ", "}
            </span>
        )
    });
    if (published) {
        return (
            <div className="paper-container">
                <div className="paper-title">
                    <Link to={link} target="_blank">{title}</Link>
                </div>
                <div className="paper-authership">
                    {authorship}
                </div>
                <div className="paper-conference">
                    Accepted by <span className="bold">{conference}</span>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="paper-container">
                <div className="paper-title">
                    <Link to={link} target="_blank">{title}</Link>
                </div>
                <div className="paper-authership">
                    {authorship}
                </div>
                <div className="paper-conference">
                    arXiv {year}
                </div>
            </div>
        );
    }
    
};


function EntryPage( ) {
    const mPhotos = [mPhoto0, mPhoto1, mPhoto2, mPhoto3];
    const [mPhotoId, setPhotoId] = useState(0);
    const turnPage = () => {
        setPhotoId((mPhotoId+1)%mPhotos.length);
    };
    
    const Json2List = (mJson) => {
        var result_list = [];
        for (var i=0; i<100; i ++) // assume there are less than 100 members
        {
            if(i in mJson) {
                result_list.push(mJson[i]);
            }
            else{
                break;
            }
        }
        console.log(result_list);
        return result_list;
    };
    const mPublicationList = Json2List(mPublications);
    const mPapers = mPublicationList.map( (paper) => {
        console.log(paper);
        return <Paper
            title={paper.title}
            authors={paper.authors}
            link={paper.link}
            conference={paper.conference}
            published={true}>            
        </Paper>
    });

    const mUnpublishedList = Json2List(mUnpublished);
    const mPapers2 = mUnpublishedList.map( (paper) => {
        console.log(paper);
        return <Paper
            title={paper.title}
            authors={paper.authors}
            link={paper.link}
            year={paper.year}
            published={false}>            
        </Paper>
    });

    return (        
        <div className="main">
            <div className="top-border"></div>
            {/* <div className="top-flowers">
                <span className="floating-left">✢°. ✤  </span>
                <span className="floating-right">.*❈。✢</span>
            </div> */}
            <div className="canvas">
                <div className="profile-container">
                    <div className="fixed-area">
                        <div className="photo-container">
                            <img src={mPhotos[mPhotoId]} onClick={turnPage} className="profile-photo" alt="Chang Chen's Profile Image" />
                            <div className="guide">[click to browse my photos!]</div>
                        </div>
                        <div className="bio-container">
                            <div className="name">
                                Chang Chen
                            </div>
                            <div className="links">
                                <Link to="https://www.linkedin.com/in/chang-chen-065b72276/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">{linkedin_icon}</Link>
                                <Link to="https://github.com/CeraChen" target="_blank">{github_icon}</Link>
                                {/* {cv_icon} */}
                            </div>
                            <div className="role">
                                MPhil student
                            </div>
                            {/* <div className="institution">
                                Computer Science and Engineering,
                            </div> */}
                            <div className="institution">
                                {/* HKUST VisLab */}
                                Hong Kong University of Science<br/>and Technology
                            </div>
                            <div className="address">
                                Clear Water Bay, Hong Kong
                            </div>
                            <div className="email">
                                cchenda<span className="small">(at)</span>connect<span className="small">(dot)</span>ust<span className="small">(dot)</span>hk
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-container">
                    <div className="scrollable-area">
                        <div className="introduction-container">
                            <div className="guidance-icon">
                                {/* <span className="floating"> .*❈</span> */}
                                <img src={logo} className="icon" alt="spinning-sloth-statue" />About Me 
                            </div>
                            <div className="text">
                                Hi there! I am <span className="italic_bold">Chang Chen </span><span className="italic">(陈畅)</span> from 
                                <Link to="https://cse.hkust.edu.hk/" target="_blank"> Computer Science and Engineering </Link>
                                at <Link to="https://hkust.edu.hk/zh-hant" target="_blank"> HKUST</Link>.
                                <br/>
                                Currently, I am pursuing a Master of Philosophy (MPhil) degree 
                                under the supervision of<Link to="http://huamin.org/" target="_blank"> Prof. Huamin Qu </Link>
                                at<Link to="http://vis.cse.ust.hk/" target="_blank"> VisLab</Link>.
                                Before that, I obtained my bachelor's degree in Computer Science and Technology
                                from <Link to="https://www.sjtu.edu.cn/" target="_blank"> Shanghai Jiao Tong University </Link>in 2023, supervised by <Link to="https://audiocc.sjtu.edu.cn/en/members/yanmin.qian" target="_blank"> Prof. Yanmin Qian</Link>.
                            </div>
                        </div>

                        <div className="interest-container">
                            <div className="guidance">
                                Research Interests 
                            </div>
                            <div className="text">
                                My research interest lies in <span className="highlight">speech interaction technology</span>, which sits at the intersection of 
                                <Link to="https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction" target="_blank"> human-computer interaction (HCI)</Link> and <Link to="https://en.wikipedia.org/wiki/Multimodal_learning" target="_blank">multimodal machine learning</Link>. 
                                I work on developing <span className="italic_bold">algorithms</span> and <span className="italic_bold">speech interfaces</span> that seamlessly connect <span className="modality">speech</span> with <span className="modality">visual</span> or <span className="modality">text</span> modalities. 
                                <br/>
                                <br/>
                                Specifically, I am focusing on the following topics:
                                <ul>
                                    <li>Extracting prosodic behaviors from speech and transferring them to the visual channel to enhance users' <span className="italic_bold">auditory discrimination abilities</span>.</li>
                                    <li>Extracting visual information from images as natural language descriptions and designing dialogue strategies to support <span className="italic_bold">accessible voice interaction</span>.</li>
                                    {/* <li>Accessibility tools for users with visual impairment</li>
                                    <li>English speaking assessment/coaching systems for non-native speakers</li> */}
                                </ul>                                
                            </div>
                        </div>

                        <div className="publication-container">
                            <div className="guidance">
                                Publications 
                            </div>
                            <div className="text">
                                {mPapers}
                            </div>
                        </div>

                        <div className="unpublished-container">
                            <div className="guidance">
                                Unpublished Paper 
                            </div>
                            <div className="text">
                                {mPapers2}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-border">
            Last updated on Mar 17 © 2025 Chang Chen
            </div>
            
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
    );
}

export default EntryPage;
