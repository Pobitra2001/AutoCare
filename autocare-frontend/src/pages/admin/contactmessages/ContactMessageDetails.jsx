import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import Sidebar from "../../../components/admin/Sidebar";

import contactMessageService from "../../../services/contactMessageService";

function ContactMessageDetails() {

    const { id } = useParams();

    const [message, setMessage] = useState(null);

    useEffect(() => {

        loadMessage();

    }, []);

    const loadMessage = async () => {

        try {

            const response = await contactMessageService.getMessageById(id);

            setMessage(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!message) {

        return (

            <div className="text-center mt-5">

                Loading...

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-2 p-0">

                    <Sidebar />

                </div>

                <div className="col-md-10 p-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h3>

                                Contact Message Details

                            </h3>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>

                                        <th>ID</th>

                                        <td>{message.id}</td>

                                    </tr>

                                    <tr>

                                        <th>Name</th>

                                        <td>{message.name}</td>

                                    </tr>

                                    <tr>

                                        <th>Email</th>

                                        <td>{message.email}</td>

                                    </tr>

                                    <tr>

                                        <th>Subject</th>

                                        <td>{message.subject}</td>

                                    </tr>

                                    <tr>

                                        <th>Message</th>

                                        <td>{message.message}</td>

                                    </tr>

                                    <tr>

                                        <th>Created At</th>

                                        <td>

                                            {

                                                message.createdAt ?

                                                    new Date(message.createdAt).toLocaleString()

                                                    :

                                                    "-"

                                            }

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                            <Link

                                to="/admin/contact-messages"

                                className="btn btn-secondary"

                            >

                                Back

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ContactMessageDetails;