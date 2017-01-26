import React, {Component} from 'react'

class AboutUsComponent extends Component {
    render() {
        return (
            <div>
                <div id="about-us">
                    <div className="container-fluid">
                        <div className="row">
                            <div id="story" className="col-md-8">
                                <h2>Story</h2>
                                <hr/>
                                <p>
                                    In 2007, David Meyer, Opencell’s current CEO, was managing a business specialized in providing
                                    enablement services for mobile operators. Confronted with the complexity and high costs of
                                    available billing solutions, he commissioned Sébastien Michéa, a Mathematics PhD who had
                                    started a software development company based in Dijon, to develop several ad hoc billing
                                    modules. Over the course of the next eight years, Sébastien stitched this initial work, and
                                    additional developments requested by David and other clients, into an integrated, configurable
                                    open source software program that could be used to model and bill almost any complex telco-type
                                    offer.
                                </p>

                                <p>
                                    In late 2014, David, Sébastien and Ethan Beardsley, who’d worked with David in business
                                    consulting, decided to create a software company focused exclusively on the open source billing
                                    project. They saw that subscription and usage-based business models were « eating the world »
                                    and that available billing options were still unattractive. And they were convinced that
                                    businesses were increasingly interested in open source business software solutions provided they
                                    could get competent enterprise support and maintenance.
                                </p>

                                <p>
                                    After closing a first deal with Orange’s cloud business in a matter of weeks, the team knew they
                                    had product/market fit. And, when Xavier Niel, the French telecom maverick, committed to invest
                                    in the not-yet created company, they pulled the trigger, leaving their day jobs, to create
                                    Opencell in March 2015.
                                </p>
                            </div>

                            <div id="offices" className="col-md-4">
                                <h2>Offices</h2>
                                <hr/>

                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>Paris</h3>
                                        <ul className="list-unstyled">
                                            <li>Opencell</li>
                                            <li>14 rue Crespin du Gast</li>
                                            <li>75011 Paris</li>
                                        </ul>
                                    </div>

                                    <div className="col-md-6">
                                        <h3>Dijon</h3>
                                        <ul className="list-unstyled">
                                            <li>Opencell</li>
                                            <li>64 A rue Sully</li>
                                            <li>21000 Dijon</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="leadership">
                    <div className="container-fluid">
                        <div className="text-center">
                            <h2>Leaders</h2>
                            <hr/>
                        </div>
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 leader">
                                        <div className="thumbnail">
                                            <img src="https://opencellsoft.com/img/team/dm.png" alt="" className="img-responsive"/>
                                            <div className="caption">
                                                <h3>David Meyer</h3>
                                                <h4>CEO &amp; Co-Founder</h4>
                                                <p>
                                                    David has over 18 years in experience in IT and business development and channel
                                                    development with telco, ITO and BPO companies, primarily starting and managing
                                                    new business units with a strong technology focus. Prior to starting Opencell,
                                                    he worked for telco operators such as Neuf Télécom (now part of SFR), Bouygues
                                                    Telecom, Experian and Docapost (the BPO subsidiary of La Poste) where he was
                                                    instrumental in commissionning the initial development work that led to the
                                                    creation of Opencell. David is a graduate of ESEIA engineering school in Paris.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 leader">
                                        <div className="thumbnail">
                                            <img src="https://opencellsoft.com/img/team/sm.png" alt="" className="img-responsive"/>
                                            <div className="caption">
                                                <h3>Sébastien Michéa</h3>
                                                <h4>CTO &amp; Co-Founder</h4>
                                                <p>
                                                    Sébastien has over 20 years of experience in software development and is an
                                                    acknowledged expert on Java and open source software. After doing post-doctorate
                                                    work in physics, he worked as billing software developer for Cap Gemini prior to
                                                    setting up the software development company that initiated the open source
                                                    billing project led to Opencell. He holds a PhD in Mathematical Physics for the
                                                    Université de Dijon and a post-doctorate degree in Statistical Physics from
                                                    Yonsei University.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 leader">
                                        <div className="thumbnail">
                                            <img src="https://opencellsoft.com/img/team/eb.png" alt="" className="img-responsive"/>
                                            <div className="caption">
                                                <h3>Ethan Beardsley</h3>
                                                <h4>COO &amp; Co-Founder</h4>
                                                <p>
                                                    Ethan has over 25 years of experience in finance, business development and
                                                    marketing in large companies and startups in the IT and media sector. Prior to
                                                    starting several digital media startups, he spent ten years at Disney in senior
                                                    finance and business development roles, most recently as VP Business Development
                                                    for Southern Europe. An American national, he holds a BA in English Literature
                                                    from Wesleyan University and is a graduate in Finance & Economics from Sciences
                                                    Po in Paris.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="investors-heading" className="container-fluid text-center">
                    <h2>Investors & Partners</h2>
                    <hr/>
                </div>

                <div id="investors">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="col-md-2 col-md-offset-1">
                                    <img src="images/investors/kimaventures.png" alt="kimaventures" />
                                </div>

                                <div className="col-md-2 col-md-offset-2">
                                    <img src="images/investors/capinnovest.png" alt="capinnovest" />
                                </div>

                                <div className="col-md-2 col-md-offset-2">
                                    <img src="images/investors/bourgogne-angels.png" alt="bourgogne angels" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="partners">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="col-md-3 text-center">
                                    <img src="https://opencellsoft.com/img/partners/bpi.png" alt="BPI France" />
                                </div>

                                <div className="col-md-3 text-center">
                                    <img src="https://opencellsoft.com/img/partners/bourgogne-franche-comte.png" alt="Région Bourgogne Franche-Comté" />
                                </div>

                                <div className="col-md-3 text-center">
                                    <img src="https://opencellsoft.com/img/partners/cap-digital.png" alt="Cap Digital" />
                                </div>

                                <div className="col-md-3 text-center">
                                    <img src="https://opencellsoft.com/img/partners/syntec-numerique.png" alt="Syntec Numérique" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
;

module.exports = AboutUsComponent;
