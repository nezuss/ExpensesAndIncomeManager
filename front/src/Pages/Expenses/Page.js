import { useState } from 'react';
import axios from 'axios';

function Page() {
    const [prevName, setPrevName] = useState("");
    const [name, setName] = useState("");
    const [costs, setCosts] = useState("");
    const [category, setCategory] = useState("");

    const CSTprevName = (event) => { setPrevName(event.target.value); };
    const CSTname = (event) => { setName(event.target.value); };
    const CSTcosts = (event) => { setCosts(event.target.value); };
    const CSTcategory = (event) => { setCategory(event.target.value); };

    async function AddExpenses() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/expenses/add";

        try {
            const response = await axios.post(link, {
                name: name,
                costs: costs,
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

    async function RemoveExpenses() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/expenses/remove";

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

    async function UpdateExpenses() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/expenses/update";

        try {
            const response = await axios.patch(link, {
                prevName: prevName,
                name: name,
                costs: costs,
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

    async function GetExpenses() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/expenses";

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
                        <h2>Add expenses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et.</p>
                        <br />
                        <div className="flex column gap-12">
                            <div className="flex column">
                                <label htmlFor="aef-name">Name</label>
                                <input id="aef-name" onChange={CSTname} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="aef-category">Category</label>
                                <input id="aef-category" onChange={CSTcategory} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="aef-costs">Costs</label>
                                <input id="aef-costs" onChange={CSTcosts} type="text" className="p-8 br-8" />
                            </div>
                        </div>
                        <br />
                        <button onClick={AddExpenses} type="submit" className="p-8 br-8">Add</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Remove expenses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra.</p>
                        <br />
                        <div className="flex column">
                            <label htmlFor="ref-name">Name</label>
                            <input id="ref-name" onChange={CSTname} type="text" className="p-8 br-8" />
                        </div>
                        <br />
                        <button onClick={RemoveExpenses} type="submit" className="p-8 br-8">Remove</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Udpate expenses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus.</p>
                        <br />
                        <div className="flex column gap-12">
                            <div className="flex column">
                                <label htmlFor="uef-name">Prev Name</label>
                                <input id="uef-name" onChange={CSTprevName} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="uef-name">Name</label>
                                <input id="uef-name" onChange={CSTname} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="uef-category">Category</label>
                                <input id="uef-category" onChange={CSTcategory} type="text" className="p-8 br-8" />
                            </div>
                            <div className="flex column">
                                <label htmlFor="uef-costs">Costs</label>
                                <input id="uef-costs" onChange={CSTcosts} type="text" className="p-8 br-8" />
                            </div>
                        </div>
                        <br />
                        <button onClick={UpdateExpenses} type="submit" className="p-8 br-8">Update</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full max-w-600 p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Get Expenses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas.</p>
                        <br />
                        <div className="flex column">
                            <label htmlFor="gef-category">Category</label>
                            <input id="gef-category" onChange={CSTcategory} type="text" className="p-8 br-8" />
                        </div>
                        <br />
                        <div className="flex gap-12 w-full">
                            <button onClick={GetExpenses} type="submit" className="p-8 br-8 w-full">Get expenses</button>
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