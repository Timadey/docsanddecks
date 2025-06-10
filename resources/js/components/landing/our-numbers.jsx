import React from 'react';

const OurNumbers = () => {
    return (
        <section className="py-10 bg-blue-50 sm:py-16 lg:py-10">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl lg:text-5xl">
                        Numbers tell our story
                    </h2>
                    <p className="max-w-xl mx-auto mt-4 text-base text-gray-600">
                        Empowering learners and professionals with practical digital skills for success.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
                    <div>
                        <h3 className="font-bold text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
            583+
          </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-blue-900">Registered Students</p>
                        <p className="text-base mt-0.5 text-blue-600">Ready to learn and grow</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
            340+
          </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-blue-900">Active Participants</p>
                        <p className="text-base mt-0.5 text-blue-600">Joined live classrooms</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
            38
          </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-blue-900">Certified Graduates</p>
                        <p className="text-base mt-0.5 text-blue-600">Achieved certification</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-16 text-center sm:gap-x-8 md:grid-cols-3">
                    <div>
                        <h3 className="font-bold text-7xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
                        100%
                        </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-blue-900">Satisfaction Rate</p>
                        <p className="text-base mt-0.5 text-blue-600">Loved by every participant</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
            12
          </span>
                        </h3>
                        <p className="mt-4 text-xl font-medium text-blue-900">Hours of Hands-On Workshops</p>
                        <p className="text-base mt-0.5 text-blue-600">Practical learning time</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
            5
          </span>
                            {/*<span className="text-xl font-normal text-blue-900"> practical projects</span>*/}
                        </h3>
                        <p className="mt-4 text-xl font-medium text-blue-900">Practical projects</p>
                        <p className="text-base mt-0.5 text-blue-600">Engaged and practicing skills</p>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default OurNumbers;
