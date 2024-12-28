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
                Accepted by <span className="bold">{conference}</span>
            </div>
        </div>
    );
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
            conference={paper.conference}>            
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
                                from <Link to="https://www.sjtu.edu.cn/" target="_blank"> Shanghai Jiao Tong University </Link>in 2023.
                            </div>
                        </div>

                        <div className="interest-container">
                            <div className="guidance">
                                Research Interests 
                            </div>
                            <div className="text">
                                My research interests lie in the intersection of 
                                <Link to="https://en.wikipedia.org/wiki/Multimodal_learning" target="_blank"> Multimodal machine learning</Link> and <Link to="https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction" target="_blank"> Human-computer interaction (HCI)</Link>. 
                                I work on developing <span className="italic_bold">algorithms</span> and designing <span className="italic_bold">voice-user interfaces</span> for intelligent systems that process multiple modalities of data, including text, speech, and images. 
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
