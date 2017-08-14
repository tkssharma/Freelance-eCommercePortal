'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import { Row, Col } from 'antd';

const mapStateToProps = ( state, ownProps ) => {
	return {
	}
}

const mapDispatchToProps = dispatch => ({
});

let WWWFooter = (props) => {
	return (
		<footer id="main">
    <div className="container">
     <div className="row">
       <div className="col-md-8 ">
        <div className="row">
           <div className="col-sm-4 col-md-3 item">
             <h4 className="title">Site Map</h4>
             <ul>
               <li><a href="">Home</a></li>
               <li><a href="">contact</a></li>
               <li><a href="">Technologies</a> </li>
               <li><a href="">Learnings</a></li>
               <li><a href="#/all">Enterprise Training</a></li>
             </ul>
           </div>

           <div className="col-sm-4 col-md-3 item">
             <h4 className="title">Technologies</h4>
             <ul>
               <li><a href="/technologies">All</a></li>

                 <li><a href="">AngularJS</a></li>
                 <li><a href="">Git</a></li>
                 <li><a href="">javascript </a></li>
                 <li><a href="">Grunt</a></li>
                 <li><a href="">JavaScript</a></li>
                 <li><a href="">Node.js</a></li>
                 <li><a href="">Java</a></li>
                 <li><a href="">Hadoop Big data</a></li>
                 <li><a href="">Android Development</a></li>

             </ul>
           </div>

           <div className="col-sm-4 col-md-5 item">
             <h4 className="title">Learning series</h4>
             <ul>
               <li><a href="">All</a></li>
                 <li><a href="">AngularJS Authentication </a></li>
                 <li><a href="">Learn Protractor Testing for AngularJS</a></li>
                 <li><a href="">Learn HTML5 Graphics and Animation</a></li>
                 <li><a href="">React Fundamentals</a></li>
                 <li><a href="">Node fundamentals</a></li>
                 <li><a href="">AngularJS Data Modeling</a></li>

             </ul>
           </div>
         </div>
       </div>

       <div className="col-md-4 ">
         <h4 className="title">Search Lessons</h4>

         <div className="search-field-holder collapsed">
           <form id="search-form-footer" className="ng-pristine ng-valid">
             <input type="text" id="st-search-input-footer" className="form-control input-search"/>
           </form>

         </div>

         <div className="social-holder">
           <a href="https://twitter.com/tkssharma" className="icon-twitter"></a>
           <a href="https://www.facebook.com/tarun.sharma.msp.engg" className="icon-facebook"></a>
           <a href="" rel="publisher" className="icon-google-plus"></a>
         </div>
       </div>
     </div>
   </div>
		</footer>
	)
}

const ConnectFooter = connect(
	mapStateToProps,
	mapDispatchToProps
)(WWWFooter)

export default ConnectFooter;
