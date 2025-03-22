import { useState } from 'react';
import axios from 'axios';

function Page() {
    const [prevName, setPrevName] = useState("");
    const [name, setName] = useState("");
    const [count, setCount] = useState("");
    const [category, setCategory] = useState("");

   const CSTprevName = (event) => { setPrevName(event.target.value); };
    const CSTname = (event) => { setName(event.target.value); };
    const CSTcount = (event) => { setCount(event.target.value); };
    const CSTcategory = (event) => { setCategory(event.target.value); };

    async function AddIncome() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/income/add";

        try {
            const response = await axios.post(link, {
                name: name,
                count: count,
                category: category
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });            
            
            responseContent.innerHTML = JSON.stringify(response.data, null, 2);
        } catch (error) {
            if (error.response) {
                responseContent.innerHTML = `Error: ${error.response.status} - ${JSON.stringify(error.response.data, null, 2)}`;
            } else {
                responseContent.innerHTML = "Error: " + error.message;
            }
        }
    }

    async function RemoveIncome() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/income/remove";

        try {
            const response = await axios.post(link, {
                name: name
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            responseContent.innerHTML = JSON.stringify(response.data, null, 2);
        } catch (error) {
            if (error.response) {
                responseContent.innerHTML = `Error: ${error.response.status} - ${JSON.stringify(error.response.data, null, 2)}`;
            } else {
                responseContent.innerHTML = "Error: " + error.message;
            }
        }
    }

    async function UpdateIncome() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/income/update";

        try {
            const response = await axios.patch(link, {
                prevName: prevName,
                name: name,
                count: count,
                category: category
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            responseContent.innerHTML = JSON.stringify(response.data, null, 2);
        } catch (error) {
            if (error.response) {
                responseContent.innerHTML = `Error: ${error.response.status} - ${JSON.stringify(error.response.data, null, 2)}`;
            } else {
                responseContent.innerHTML = "Error: " + error.message;
            }
        }
    }

    async function GetIncome() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/income";

        try {
            const response = await axios.post(link, {
                category: category
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            responseContent.innerHTML = JSON.stringify(response.data, null, 2);
        } catch (error) {
            if (error.response) {
                responseContent.innerHTML = `Error: ${error.response.status} - ${JSON.stringify(error.response.data, null, 2)}`;
            } else {
                responseContent.innerHTML = "Error: " + error.message;
            }
        }
    }

    return (
        <div className="flex row align-start justify-center gap-12 p-12">
            <div className="flex column justify-center align-center gap-12 w-350" style={{paddingLeft: "13px", paddingRight: "13px"}}>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Add income</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis.</p>
                        <br />
                        <div className="flex column gap-12">
                            <div className="flex column">
                                <label htmlFor="aif-name">Name</label>
                                <input id="aif-name" onChange={CSTname} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="aif-category">Category</label>
                                <input id="aif-category" onChange={CSTcategory} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="aif-name">Count</label>
                                <input id="aif-name" onChange={CSTcount} type="text" className="p-8 br-8" />
                            </div>
                        </div>
                        <br />
                        <button onClick={AddIncome} type="submit" className="p-8 br-8">Add</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Remove income</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend.</p>
                        <br />
                        <div className="flex column">
                            <label htmlFor="rif-name">Name</label>
                            <input id="rif-name" onChange={CSTname} type="text" className="p-8 br-8" />
                        </div>
                        <br />
                        <button onClick={RemoveIncome} type="submit" className="p-8 br-8">Remove</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Update income</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu.</p>
                        <br />
                        <div className="flex column gap-12">
                            <div className="flex column">
                                <label htmlFor="uif-name">Prev name</label>
                                <input id="uif-name" onChange={CSTprevName} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="uif-name">Name</label>
                                <input id="uif-name" onChange={CSTname} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="uif-category">Category</label>
                                <input id="uif-category" onChange={CSTcategory} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="uif-name">Count</label>
                                <input id="uif-name" onChange={CSTcount} type="text" className="p-8 br-8" />
                            </div>
                        </div>
                        <br />
                        <button onClick={UpdateIncome} type="submit" className="p-8 br-8">Update</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full max-w-600 p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Get Income</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas.</p>
                        <br />
                        <div className="flex column">
                            <label htmlFor="gif-category">Category</label>
                            <input id="gif-category" onChange={CSTcategory} type="text" className="p-8 br-8" />
                        </div>
                        <br />
                        <div className="flex gap-12 w-full">
                            <button onClick={GetIncome} type="submit" className="p-8 br-8 w-full">Get incomes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sticky flex column gap-12 max-w-600 w-600 bg-2 b p-12 br-12 top-12">
                <h2 className="c-2">Response</h2>
                <hr />
                <div className="scroll-x">
                    <pre id="response"></pre>
                </div>
            </div>
        </div>
    );
}

export default Page;