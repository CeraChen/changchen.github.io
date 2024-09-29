import { React, useState, useRef, useEffect  } from "react";
import { Link } from 'react-router-dom';
import "../css/entry.css";
import "../css/scroller.css";

import logo from '../icon/sloth-statue.png';
import mPhoto from '../photo/profile.jpg';
import mPublications from "../json/publications.json";


function Author( {author, idx} ) {
    return <span className={(author == "Chang Chen")? "self-author":"co-author"}>
        {author}
        {(idx == 0) && <sup>1</sup>}
    </span>;
};


function Paper( { title, authors, link, photo, conference } ) {
    const authorship = authors.map( (author, idx) => {
        return (
            <span>
                <Author author={author} idx={idx}></Author>
                {(idx != (authors.length-1)) && ", "}
            </span>
        )
    });
    return (
        <div className="paper-container">
            <div className="paper-title">
                <Link to={link} target="_blank">{title}</Link>
            </div>
            <div className="paper-authership">
                {authorship}
            </div>
            <div className="paper-conference">
                Accpected by <span className="bold">{conference}</span>
            </div>
        </div>
    );
};


function EntryPage( ) {
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
            conference={paper.conference}>            
        </Paper>
    });

    return (        
        <div className="main">
            <div className="canvas">
                <div className="profile-container">
                    <div className="fixed-area">
                        <div className="photo-container">
                            <img src={mPhoto} className="profile-photo" alt="Chang Chen's Profile Image" />
                        </div>
                        <div className="bio-container">
                            <div className="name">
                                Chang CHEN
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
                                Hi! I am <span className="italic">Chang CHEN (陈畅)</span> from 
                                <Link to="https://cse.hkust.edu.hk/" target="_blank"> Computer Science and Engineering </Link>
                                at <Link to="https://hkust.edu.hk/zh-hant" target="_blank"> HKUST</Link>.
                                <br/>
                                Currently, I am pursuing a Master of Philosophy (MPhil) degree 
                                under the supervision of<Link to="http://huamin.org/" target="_blank"> Prof. Huamin Qu </Link>
                                at<Link to="http://vis.cse.ust.hk/" target="_blank"> VisLab</Link>.
                                Before that, I obtained my bachelor's degree in Computer Science and Technology
                                from <Link to="https://www.sjtu.edu.cn/" target="_blank"> Shanghai Jiao Tong University </Link>in 2023.
                            </div>
                        </div>

                        <div className="interest-container">
                            <div className="guidance">
                                Research Interests 
                            </div>
                            <div className="text">
                                My research interests lie in the intersection of 
                                <span className="highlight"> human-computer interaction (HCI)</span> and <span className="highlight">multimodal machine learning</span>. 
                                I work on designing voice-user interfaces, as well as intelligent systems that process multiple modalities of data, such as text, audio, or images. 
                                <br/>
                                <br/>
                                Specifically, I am focusing on the following topics:
                                <ul>
                                    <li>Accessibility tools for users with visual impairment</li>
                                    <li>English speaking assessment/coaching systems for non-native speakers</li>
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
                    </div>
                </div>
            </div>
            
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
    );
}

export default EntryPage;
