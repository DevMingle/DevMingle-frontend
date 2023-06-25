import React from 'react'

const Languages = () => {

    const languages: string[] = ["Apache Groovy", "Markdown", "C", "C#", "C++", "CSS", "Clojure", "Dart", "Python", "Javascript", "Typescript"];

    const frameworks: string[] = [".NET", "Anaconda", "Angular", "React", "Vue", "Solid", "Qwik", "Django", "React Native", "SVelte", "ThreeJS", "Meteor", "TailwindCSS", "Chakra UI", "Material UI", "Daisy UI", "YARN", "NPM", "PNPM", "SOCKET IO", "Semantic Ui React"];

    const databases: string[] = ["MongoDB", "Cockroach Labs", "Supabase", "Firebase", "MySQL", "NoSQL", "Redis", "Amazon DynamoDB", "Postgres", "MariaDB"]

    return (
        <div className='text-text-dark p-10 md:p-16'>
            <div className='mx-auto container flex flex-col'>

                {/* Languages */}

                <div className='text-2xl my-10'>
                    <h1 className='uppercase'>Languages</h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Name</th>
                                <th>Choose</th>
                            </tr>
                        </thead>
                        <tbody>

                            {languages.map((val, ind) => (
                                <tr key={ind}>
                                    <th>{ind + 1}</th>
                                    <td className='uppercase'>{val}</td>
                                    <td>
                                        <input type="checkbox" className='accent-accent-dark' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Frameworks, Platforms & libraries */}

                <div className='text-2xl my-10'>
                    <h1 className='uppercase'>Frameworks, Platforms & libraries</h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Name</th>
                                <th>Choose</th>
                            </tr>
                        </thead>
                        <tbody>

                            {frameworks.map((val, ind) => (
                                <tr key={ind}>
                                    <th>{ind + 1}</th>
                                    <td className='uppercase'>{val}</td>
                                    <td>
                                        <input type="checkbox" className='accent-accent-dark' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Databases */}

                <div className='text-2xl my-10'>
                    <h1 className='uppercase'>Databases</h1>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Name</th>
                                <th>Choose</th>
                            </tr>
                        </thead>
                        <tbody>

                            {databases.map((val, ind) => (
                                <tr key={ind}>
                                    <th>{ind + 1}</th>
                                    <td className='uppercase'>{val}</td>
                                    <td>
                                        <input type="checkbox" className='accent-accent-dark' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div >
    )
}

export default Languages