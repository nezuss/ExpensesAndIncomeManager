import { useState } from 'react';
import axios from 'axios';

function Page() {
    const [prevName, setPrevName] = useState("");
    const [name, setName] = useState("");

    const CSTprevName = (event) => { setPrevName(event.target.value); };
    const CSTname = (event) => { setName(event.target.value); };

    async function AddCategory() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/category/add";

        try {
            const response = await axios.post(link, {
                name: name
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

    async function RemoveCategory() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/category/remove";

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

    async function UpdateCategory() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/category/update";

        try {
            const response = await axios.patch(link, {
                prevName: prevName,
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

    async function GetCategory() {
        const responseContent = document.getElementById("response");
        const link = "http://localhost:5116/api/protected/category";

        try {
            const response = await axios.get(link, {
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
                        <h2>Add category</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.</p>
                        <br />
                        <div className="flex column">
                            <label htmlFor="acf-name">Name</label>
                            <input id="acf-name" onChange={CSTname} type="text" className="p-8 br-8" />
                        </div>
                        <br />
                        <button onClick={AddCategory} type="submit" className="p-8 br-8">Add</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Remove category</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget.</p>
                        <br />
                        <div className="flex column">
                            <label htmlFor="rif-name">Name</label>
                            <input id="rif-name" onChange={CSTname} type="text" className="p-8 br-8" />
                        </div>
                        <br />
                        <button onClick={RemoveCategory} type="submit" className="p-8 br-8">Remove</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Update category</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis.</p>
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
                        </div>
                        <br />
                        <button onClick={UpdateCategory} type="submit" className="p-8 br-8">Update</button>
                    </div>
                </div>
                <div className="flex gap-12 bg-2 b w-full max-w-600 p-12 br-12">
                    <div className="flex column w-full">
                        <h2>Get categories</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum.</p>
                        <br />
                        <div className="flex gap-12 w-full">
                            <button onClick={GetCategory} type="submit" className="p-8 br-8 w-full">Get categories</button>
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