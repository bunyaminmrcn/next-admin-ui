//@ts-nocheck
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
import { EyeIcon, EyeOffIcon, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"


import axios from '@/components/api/axios';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';

export default function DeleteUserDialog(props) {

    const { toast } = useToast()
    const { open, setOpen, user, onClose } = props;
    const [passwordSee, setPasswordSee] = React.useState(true)
    const [password, setPassword] = React.useState("")
    const [lodingSpinner, setLoadingSpinner] = React.useState(false)
    const [passwordStrength, setPasswordStrength] = React.useState(0)

    const name = user?.name || '';
    const email = user?.email || '';
    const uid = user?.uid || '';

    const selfClose = (state: boolean) => {
        onClose()
        setOpen(state)
    }

    const onSubmit = () => {

        setLoadingSpinner(true);
        axios.delete(`/api/users/delete/${uid}`).then(res => {
            //console.log({res: res.data})

            setOpen(false)
            toast({
                title: "Scheduled: Catch up ",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })
        }).catch(err => {
            console.log({ err })
        }).finally(() => {
            setLoadingSpinner(false)
        })
    }
    return (
        <>
            {
               <Dialog open={open} onOpenChange={selfClose}>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Delete profile</DialogTitle>
                            <DialogDescription>
                                Delete Profile.
                            </DialogDescription>
                        </DialogHeader>
                        <form>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Full Ad
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue={name}
                                        className="col-span-3"
                                        readOnly
                                    //value={name}
                                    //onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        defaultValue={email}
                                        className="col-span-3"
                                        type="email"
                                        readOnly
                                    //value={email}
                                    //onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                        <DialogFooter>
                            <Button type="submit" onClick={() => {
                                onSubmit()
                            }}>Delete user</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}
