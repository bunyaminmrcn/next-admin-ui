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

export default function EditUserDialog(props) {

    const { toast } = useToast()
    const { open, setOpen, user, onClose } = props;

    const { name, email, role } = user;

    const selfClose = (state: boolean) => {
        onClose()
        setOpen(state)
    }

    return (
        <>
            {
                <Dialog open={open} onOpenChange={selfClose}>

                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>View profile</DialogTitle>
                            <DialogDescription>
                                View Profile
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
                                        disabled
                                    //value={values.name}
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
                                        disabled
                                    //value={values.email}
                                    //onChange={handleChange}
                                    />
                                </div>





                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        Role
                                    </Label>
                                    <Input
                                        id="role"
                                        defaultValue={role}
                                        className="col-span-3"
                                        type="text"
                                        readOnly
                                        disabled
                                    //value={values.email}
                                    //onChange={handleChange}
                                    />
                                </div>

                            </div>
                        </form>
                        <DialogFooter>
                            <Button type="submit" onClick={() => {
                                selfClose(false)
                            }}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}
