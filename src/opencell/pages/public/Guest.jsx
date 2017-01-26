import React from 'react';
import {Link} from 'react-router';

import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';

import * as properties from '../../../properties';

class Dashboard extends React.Component {

    constructor() {
        super();
    }

    getHeightSum(elements) {
        var height = 0;

        for (var i = 0; i < elements.length; i++) {
            height += elements[i].clientHeight;
        }

        return height;
    }

    onLearnmoreClick() {
        this.scrollPosition('/learn-more');
    }

    scrollPosition(position) {
        var scrollHeight = 0;
        switch(position) {
            // case '/about':
            //     scrollHeight = this.getHeightSum([this.refs.banner, this.refs.guestContent]);
            //     break;
            case '/learn-more':
                scrollHeight = this.getHeightSum([this.refs.banner]);
                break;
        }

        if(scrollHeight > 0) {
            window.requestAnimationFrame(function () {
                window.scrollTo(0, scrollHeight);
            }.bind(this));
        }
    }

    componentDidMount() {
        this.scrollPosition(this.props.location.pathname);
    }

    componentDidUpdate() {
        this.scrollPosition(this.props.location.pathname);
    }

    render() {
        return (
            <div>
                <div ref="banner" className="banner">
                    <div className="welcome-text">
                        <h1>
                            <span>Welcome to OpenCell</span>
                            <span>Opencell started with one simple mission : to provide open source,</span>
                            <span>disruptive and cost-effective monetization solutions for digital service providers.</span>
                        </h1>
                    </div>

                    <video src="https://www.dropbox.com/s/31cepuxcqop27c9/Typer.mp4?dl=1" loop="loop" muted="muted"
                           autoPlay="autoplay" className="video-bg"></video>

                    <a onClick={this.onLearnmoreClick.bind(this)} className="btn btn-theme-default learn-more-btn scroll">learn <i
                        className="fa fa-2x fa-arrow-down"></i> more</a>
                </div>
                <div ref="guestContent" id="guest-content" className="container-fluid guest-container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="row display-flex">
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-wrapper">
                                    <div className="thumbnail">
                                        <img src="images/home/img-9.jpg" alt="" className="img-responsive"/>
                                        <div className="caption">
                                            <h3>This is a Title</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod
                                                odio, gravida pellentesque urna varius vitae Lorem
                                                ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio,
                                                gravida pellentesque urna varius vitae.
                                            </p>
                                            <p className="text-center">
                                                <a href="#" className="btn btn-theme-default">Action</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-wrapper">
                                    <div className="thumbnail">
                                        <img src="images/home/img-10.jpg" alt="" className="img-responsive"/>
                                        <div className="caption">
                                            <h3>This is a Title</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod
                                                odio, gravida pellentesque urna varius vitae Lorem ipsum
                                                dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida
                                                pellentesque urna varius vitae.
                                            </p>
                                            <p className="text-center">
                                                <a href="#" className="btn btn-theme-default">Action</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-wrapper">
                                    <div className="thumbnail">
                                        <img src="images/home/img-11.jpg" alt="" className="img-responsive"/>
                                        <div className="caption">
                                            <h3>This is a Title</h3>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod
                                                odio, gravida pellentesque urna varius vitae Lorem ipsum
                                                dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida
                                                pellentesque urna varius vitae.
                                            </p>
                                            <p className="text-center">
                                                <a href="#" className="btn btn-theme-default">Action</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Dashboard;
