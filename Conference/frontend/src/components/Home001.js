import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css'
import image from '../Images/about.jpg'
import original from '../Images/original.png'
import copy from '../Images/copy.png'
import time from '../Images/time.png'
import ourvision from '../Images/ourvision.png'
import ourmission from '../Images/ourmission.png'
import event1 from '../Images/event.jpg'
import event2 from '../Images/event2.jpg'
import event3 from '../Images/event3.jpg'
import event4 from '../Images/event4.jpg'
import event5 from '../Images/event5.jpg'
import event6 from '../Images/event6.jpg'
import submission from '../Images/submission.png'
import registration from '../Images/registration.png'
import conference from '../Images/conference.png'
import dates from '../Images/dates.png'
import { useNavigate, useLocation } from 'react-router-dom';

const Home001 = () => {
    const image1= image;

    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const Email1 = params.get('email');

    const [name, setname] = useState('');
    const [status, setstatus] = useState('');


    useEffect(() => {
    
        async function fetchAllDocuments() {
          try {
            const response = await axios.post("http://localhost:5000/profile", { Email1 });
            setname(response.data);

          } catch (err) {
            // setErro(err.message);
          }
        }
    
        fetchAllDocuments();
      }, [Email1]);

      useEffect(() => {
    
        async function fetchAllDocuments() {
          try {
            const response = await axios.post("http://localhost:5000/documentsta", { Email1 });
            setstatus(response.data);

          } catch (err) {
            // setErro(err.message);
          }
        }
    
        fetchAllDocuments();
      }, [Email1]);
    // const original1= original
    const isMaheshEmail = Email1 === 'maheshkumar001234@gmail.com';
    const isstatus = status === 'Not_Available';
    console.log(status);
  return (
    <div>
        <div className='header'>
            <div className='logo'>

            </div>
            <div className='headertop'>
                <div className='menu'>
                    <ul>
                        <li>
                            <a href='#home'>Home</a>
                        </li>
                        <li>
                            <a href='#about'>About</a>
                        </li>
                        {/* <li>
                            <a href='#Problem Statement'>Problem Statement</a>
                        </li> */}
                        <li>
                            <a href='#Submission'>Submission</a>
                        </li>
                        <li>
                            <a href='#gallary'>Gallary</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p style={{color:'GrayText',fontSize:20}}>{name}</p>
                </div>
            </div>

        </div>
        <div id='home'>
            <div className='hero'>
                <div className='banner'>
                    <p style={{fontSize:40, color:'white'}}>Conference</p>
                    <div className='ctitle'>
                        <p style={{fontSize:30, width:600}}>Future of Artificial Intelligence: Challenges and Opportunities</p>
                        <div className='datet'>
                            <p style={{fontSize:50, paddingBottom:13}}>May</p>
                            <b><p style={{fontSize:40, paddingBottom:13}}>25 - 30</p></b>
                            <p style={{fontSize:30}}>Ramco Institute Of Technology</p>
                        </div>
                    </div>
                    <div style={{paddingTop: 50}}>
                        {isMaheshEmail ? (
                            <button className='button1' onClick={() => navigate(`/Profile?email=${encodeURIComponent(Email1)}`)}><b>Review</b></button>
                        ) : (
                            isstatus ? (
                                <>
                                    {/* <button onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}>Upload</button> */}
                                    <button className='button1' onClick={() => navigate(`/upload?email=${encodeURIComponent(Email1)}`)}><b>Participate</b></button>
                                </>
                            ) : (
                                <button className='button1' onClick={() => navigate(`/profile?email=${encodeURIComponent(Email1)}`)}>Uploaded</button>
                            )
                        )}
                    </div>
                    < div >
                    <p></p>
                    </div>

                </div>
            </div>
        </div>
        <div id='about'>
            <div className='about'>
                <div className='abouti'>
                    <div className='content'>
                    <p style={{fontSize:50}}><b className='headings'>About</b></p>
                        <br />
                        <p style={{width:600, fontSize:20, textAlign:'justify'}}>Welcome to the Conference Management System (CMS), where we specialize in simplifying the process of organizing and managing conferences. With our user-friendly platform, customizable solutions, and dedicated support, we aim to empower conference organizers to create successful and memorable events effortlessly. Our team's expertise in event management and technology ensures that you have all the tools and assistance you need to plan, coordinate, and execute your conference with ease. Choose CMS for a seamless conference experience that exceeds your expectations.</p>
                    </div>
                    <div className='aimage'>
                        <img src={image1} alt='about' width={500} height={300}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='dates'>
            <center>
            <p style={{fontSize:30,paddingTop:50}}>
                <b className='headings'>CONFERENCE DATES</b>
            </p>
            </center>
            <div className='wrapconference'>
                <div className='datesi'>
                    <div className='detecompu'>
                        <div className='dateicons'>
                            <center>
                                <img src={registration} alt='registor'/>
                            </center>
                        </div>
                        <div className='contenticon'>
                            <p style={{fontSize:30,paddingBottom:10,color:'rgb(77, 177, 254)'}}><b>Registration Date</b></p>
                            <p style={{fontSize:18}}>Register the Conference and explore your skils. Simply You can <a href='/register' style={{textDecoration:'none',color:'blue'}}>Register</a></p>
                            <p style={{fontSize:20,color:'#b5f87d',}}><b>May 20, 2024</b></p>
                        </div>
                    </div>
                    <div className='detecompu'>
                        <div className='dateicons'>
                            <center>
                                <img src={submission} alt='submission'/>
                            </center>
                        </div>
                        <div className='contenticon'>
                            <p style={{fontSize:30,paddingBottom:10,color:'rgb(77, 177, 254)'}}><b>Submission Date</b></p>
                            <p style={{fontSize:18}}>You can submit your reach paper on time then you will get the acknowledgement</p>
                            <p style={{fontSize:20,color:'#b5f87d',}}><b>May 25, 2024 - May 30, 2024</b></p>
                        </div>
                    </div>
                    <div className='detecompu'>
                        <div className='dateicons'>
                            <center>
                                <img src={conference} alt='conference'/>
                            </center>
                        </div>
                        <div className='contenticon'>
                            <p style={{fontSize:30,paddingBottom:10,color:'rgb(77, 177, 254)'}}><b>Conference Date</b></p>
                            <p style={{fontSize:18}}>The conference is work with togather a professionals in AI. </p>
                            <p style={{fontSize:20,color:'#b5f87d',}}><b>May 40, 2024</b></p>
                        </div>
                    </div>
                </div>
                <img src={dates} style={{width:450,height:450}} alt='datess'/>
            </div>
        </div>
        <div id='Submission'>
            <div className='Submission'>
                <div className='subcontent'>
                    <center>
                    <p style={{color: 'rgb(98, 160, 248)',fontSize:40}} className='headings'><b>Submission Details</b></p>
                    </center>
                    <p style={{fontSize:23}}><b><u>Problem Statement</u></b></p><br/>
                    <p style={{fontSize:18, textAlign:'justify'}}>"In the realm of Artificial Intelligence (AI), the road ahead is marked by a mix of challenges and opportunities. As AI progresses, it's crucial to tackle technical hurdles, ethical dilemmas, societal impacts, and regulatory gaps. Challenges include ensuring AI reliability, addressing biases, managing job displacement, and navigating regulatory uncertainties. However, AI also promises innovation across sectors, from healthcare to environmental monitoring. To steer this future effectively, collaboration is key, fostering responsible AI development and deployment for the benefit of society."</p>
                </div>
                <div className='retrictions'>
                    <p style={{fontSize:23, paddingBottom:30}}><b><u>Restrictions</u></b></p>
                    <div className='restrictioni'>
                        <div>
                            <center>
                            <img src={original} alt='original' width={150} height={150}/>
                            <p style={{fontSize:18,paddingTop:16}}><b>Original</b></p>
                            <p style={{fontSize:14}}>The content must be original</p>
                            </center>
                        </div>
                        <div>
                            <center>
                            <img src={copy} alt='original' width={150} height={150}/>
                            <p style={{fontSize:18,paddingTop:16}}><b>Don't Copy</b></p>
                            <p style={{fontSize:14}}>Don't copy the content</p>
                            </center>
                        </div>
                        <div>
                            <center>
                            <img src={time} alt='original' width={150} height={150}/>
                            <p style={{fontSize:18,paddingTop:16}}><b>Time</b></p>
                            <p style={{fontSize:14}}>Time to submit the Paper</p>
                            </center>
                        </div>
                    </div>
                </div>
                <center>
                    <div>
                        <p style={{fontSize:15, textAlign:'center',paddingTop:20,paddingBottom:40}}>"At the website, we prioritize the integrity and originality of research papers submitted to our platform. Plagiarism, in any form, undermines the credibility of scholarly discourse and violates the trust of readers and fellow researchers. We define plagiarism as presenting someone else's ideas, words, or work as your own without proper attribution. Authors are expected to adhere to the highest standards of academic integrity, and any instance of plagiarism will result in immediate rejection of the submission. Additionally, to maintain efficiency, we impose time restrictions on submissions, requiring authors to submit within specified deadlines. Failure to meet these deadlines may result in delays in the review process or exclusion from consideration. However, we understand that unforeseen circumstances may arise, and authors may request extensions on a case-by-case basis. By adhering to our policies, authors help us uphold the integrity of our platform and ensure a fair and timely review process for all submissions."</p>
                    </div>
                </center>
            </div>
        </div>
        <div className='ourvisitioni'>
            <div className='abouti'>
                <div className='aimage'>
                    <img src={ourvision} alt='about' width={500} height={300}/>
                </div>
                <div className='content'>
                    <p style={{fontSize:50}} className='headings'><b>Our Vision</b></p>
                    <br />
                    <p style={{width:600, fontSize:20, textAlign:'justify'}}>At the Conference Management System (CMS), our vision is to redefine the conference experience by leveraging technology and innovation. We envision a world where organizing and attending conferences is seamless, engaging, and enriching for everyone involved. By continuously improving our platform and services, we strive to be the leading choice for conference organizers seeking efficiency, flexibility, and excellence. With a commitment to customer satisfaction and a passion for excellence, we aim to set new standards in conference management and empower organizers to create impactful and successful events that inspire and connect people. Join us in shaping the future of conferences with CMS.</p>
                </div>
            </div>
        </div>
        <div className='ourmissioni'>
            <div className='abouti'>
                <div className='content'>
                    <p style={{fontSize:50}} className='headings'><b>Our Mission</b></p>
                    <br />
                    <p style={{width:600, fontSize:20, textAlign:'justify'}}>At the Conference Management System (CMS), our mission is to provide conference organizers with a comprehensive, user-friendly platform that streamlines the planning, execution, and management processes, ultimately enhancing the overall conference experience. We are dedicated to offering innovative solutions that simplify complex tasks, increase efficiency, and maximize the impact of conferences. Our mission is to empower organizers with the tools and support they need to create dynamic and memorable events that foster collaboration, knowledge sharing, and networking opportunities. Through our unwavering commitment to excellence, integrity, and customer satisfaction, we aim to be the trusted partner for conference organizers worldwide, driving positive change and innovation in the conference industry.</p>
                </div>
                <div className='aimage'>
                    <img src={ourmission} alt='about' width={550} height={400}/>
                </div>
            </div>
        </div>
        <div id='gallary'>
            <div className='gallary'>
                <div className='gallary1'>
                    <center>
                    <p style={{fontSize:30,paddingBottom:5}} className='headings'><b>GALLERY</b></p>
                    <p style={{fontSize:15,paddingBottom:50}}>The conference event images</p>
                    <div className='gallery'>
                        <center>
                        <img src={event1} alt='about'/>
                        <img src={event2} alt='about'/>
                        <img src={event3} alt='about'/>
                        <img src={event4} alt='about'/>
                        <img src={event5} alt='about'/>
                        <img src={event6} alt='about'/>
                        </center>
                    </div>
                    </center>
                </div>
            </div>
        </div>
        <div className='vanue'>
            <div className=''>
                <center>
                    <p style={{}}>Conference Vanue</p>
                    <p style={{}}>Ramco Institute of Technology</p>
                </center>
                <div className='maps'>
                    
                </div>
            </div>
        </div>
        <div className='footer'>
            footer
        </div>
        
    </div>
  )
}

export default Home001