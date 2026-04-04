import React from 'react';

const Blog = () => {
    return (
        <section className="bg-black text-gray-100 px-3 py-4 lg:p-10 rounded mx-3 my-4 lg:m-10">
            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <h2 className="mb-5 lg:mb-12 text-sm lg:text-4xl font-bold leading-none text-amber-300 text-center">Some Important Questions About React</h2>
                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">What are the different ways to manage a state in a React application?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                There are four main types of state you need to properly manage in your React apps: <br />
                                <div className='lg:ml-5'>
                                    1. Local state  <br />
                                    2. Global state <br />
                                    3. Server state <br />
                                    4. URL state <br />
                                </div>
                            </p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">How does prototypical inheritance work?</summary>
                        <div className="px-4 pb-4">
                            <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object.</p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">What is a unit test? Why should we write unit tests?</summary>
                        <div className="px-4 pb-4 space-y-2">
                            <p>Unit Testing is a type of software testing where individual units or components of a software are tested.</p>
                            <p>Unit testing ensures that all code meets quality standards before it's deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and money, and helps developers write better code, more efficiently.</p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">React vs. Angular vs. Vue?</summary>
                        <div className="px-4 pb-4 space-y-2 overflow-x-auto">
                            <table className="min-w-full text-xs">
                                <thead className="dark:bg-gray-700">
                                    <tr className="text-left">
                                        <th className="p-3">React</th>
                                        <th className="p-3">Angular</th>
                                        <th className="p-3">Vue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                        <td className="p-3">
                                            <p>It is known as a JavaScript syntax extension, and it is not necessary to use them in react but recommended.</p>
                                        </td>
                                        <td className="p-3">
                                            <p >It automatically curbs the JavaScript code for each browser. Therefore, it is cross-compliant.</p>
                                        </td>
                                        <td className="p-3">
                                            <p>It has an adoptable incremental system that incrementally scales between a library and a full-featured framework.</p>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                        <td className="p-3">
                                            <p>The data flow in react is unidirectional hence making a simpler data flow. The pattern used for unidirectional flow is known as flux.</p>
                                        </td>
                                        <td className="p-3">
                                            <p >The automatic synchronization between data and the elements is defined as dynamic binding.</p>
                                        </td>
                                        <td className="p-3">
                                            <p>Virtual DOM is also used by angular and react. It is good in terms of optimization, and being inexpensive, the changes are made at a faster rate.</p>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                        <td className="p-3">
                                            <p>The React JS is in the current trend, and with the advent of the framework, the community is growing day by day. For any queries, we can get help from a lot of peers.</p>
                                        </td>
                                        <td className="p-3">
                                            <p >Very helpful in creating single-page websites with proper maintenance and cleanliness.</p>
                                        </td>
                                        <td className="p-3">
                                            <p>Vue can be integrated with React frameworks; thus, merging any project becomes easier.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default Blog;