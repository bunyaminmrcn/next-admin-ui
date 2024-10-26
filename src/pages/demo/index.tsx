//@ts-nocheck
"use client";


import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { db } from "@/lib/firebase-apps";


// Mock data for users

const fakeData = Array.from({ length: 10 }, (i, j) => {
    return { i, j }
})
import { getFirestore, collection, onSnapshot, query, where, orderBy, startAfter, limit, getDocs, startAt, endAt, endBefore, doc, getDoc } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton"

import AddUserDialog from "@/components/built-in/users/add-user-dialog";
import EditUserDialog from "@/components/built-in/users/edit-user-dialog";
import DeleteUserDialog from "@/components/built-in/users/delete-user-dialog";
import ViewUserDialog from "@/components/built-in/users/view-user-dialog";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase-auth";
import { signInWithCustomToken } from 'firebase/auth';

let goFetch = false;

function UserDashboard() {

    const [loading, setLoading] = React.useState(true);

    const [users, setUsers] = React.useState([]);
    const [editUser, setEditUser] = React.useState(null);
    const [deleteUser, setDeleteUser] = React.useState(null);
    const [viewUser, setViewUser] = React.useState(null);


    const [currentPage, setCurrentPage] = React.useState(1)
    const usersPerPage = 5
    const totalPages = Math.ceil(users.length / usersPerPage)

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [viewDialogOpen, setViewDialogOpen] = React.useState(false);

    const getData = async () => {

        const params = Object.fromEntries(new URLSearchParams(location.search));
        /*
        
        const pageStr = params?.page || '0';
        const pageInit = +pageStr;
        const page = Math.max(pageInit, 1);
        */
        const fromStr = params?.from || '0';
        const fromInit = +fromStr;
        const from = Math.max(fromInit, 0);


        const limitStr = params?.limit || '1';
        const limitInit = +limitStr;
        const limitSetDirect = params.limit !== undefined

        //const indexRef = doc(db, 'indexes', `${from}`);
        // Get the document
        //const userDoc = await getDoc(indexRef);
        const usersRef = collection(db, "users");

        const first = query(usersRef, where('order', '<=', from + (limitSetDirect ? limitInit : 5)),
            where('order', '>=', from),
            where('deleted', '!=', true),
            limit(limitSetDirect ? limitInit : 5));
        const documentSnapshots = await getDocs(first);

        const data = documentSnapshots.docs.map(d => ({ ...(d.data()), uid: d.id }))
        setUsers(data)
        console.log({ data })
        setLoading(false)


        /*
    onSnapshot(usersRef, (snapshot) => {
        const data = snapshot.docs.map(d => ({ ...(d.data()), uid: d.id }))
        setUsers(data)
        setLoading(false)
        console.log({ data })
    })*/

    }

    const editOrViewDetailsOnClose = () => {
        setEditUser(null)
    }

    const deleteDetailsOClose = () => {
        setDeleteUser(null)
    }

    const viewDetailsOClose = () => {
        setDeleteUser(null)
    }

    React.useEffect(() => {

        onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                await getData();
                console.log("USER")
            } else {
                console.log('NO')
            }
        })


        return () => { };
    }, [])
    return (<>
        <AddUserDialog open={addDialogOpen} setOpen={setAddDialogOpen} />
        {
            editUser && <EditUserDialog open={editDialogOpen} setOpen={setEditDialogOpen} user={editUser} onClose={editOrViewDetailsOnClose} />
        }
        {
            deleteUser && <DeleteUserDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} user={deleteUser} onClose={deleteDetailsOClose} />
        }
        {
            viewUser && <ViewUserDialog open={viewDialogOpen} setOpen={setViewDialogOpen} user={viewUser} onClose={viewDetailsOClose} />
        }
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <Button onClick={() => {
                    setAddDialogOpen(true)
                }}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading &&
                            fakeData.map((data) => (
                                <TableRow key={data.j}>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                            ))
                        }
                        {!loading && users.map((user) => (
                            <TableRow key={user.uid}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user?.order}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => {
                                                setEditUser(user)
                                                setEditDialogOpen(true);
                                            }}>Edit user</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => {
                                                setViewUser(user)
                                                setViewDialogOpen(true);
                                            }}>View details</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600" onClick={() => {
                                                setDeleteUser(user)
                                                setDeleteDialogOpen(true);
                                            }}>
                                                Delete user
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                    {Math.min(currentPage * usersPerPage, users.length)} of {users.length} users
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    </>
    )
}

import PrivateLayout from '../../layouts/private'
import { initAuthorizedAppsEmulator } from "@/lib/firebase-apps";

export default () => {

    const init = async () => {

        initAuthorizedAppsEmulator().then(() => {
            goFetch = true
        }).catch(err => {
            goFetch = false
        }).finally(() => {
            console.log({ goFetch })
        })
    }
    React.useEffect(() => {
        init()
    }, [])
    return <PrivateLayout><UserDashboard /></PrivateLayout>
}