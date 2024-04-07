import React from 'react';
import {useNavigate} from "react-router-dom";

function Home(props) {
    const navigate = useNavigate()
    function start (e){
        navigate(`/draw/${crypto.randomUUID()}`)


    }

    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-light text-dark" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5">

                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Entering</h2>
                                        <div className="form-outline form-white mb-4 mt-4 text-start">
                                            <input placeholder={"Enter your name"} type="name" id="name"
                                                className="form-control form-control-lg" />
                                        </div>

                                        <button onClick={start} className="btn btn-primary btn-lg px-5 mt-4 text-start" type="submit">Start Now
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
