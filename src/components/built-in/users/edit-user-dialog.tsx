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
    const [passwordSee, setPasswordSee] = React.useState(true)
    const [password, setPassword] = React.useState("")
    const [lodingSpinner, setLoadingSpinner] = React.useState(false)
    const [passwordStrength, setPasswordStrength] = React.useState(0)

    const selfClose = (state: boolean) => {
        onClose()
        setOpen(state)
    }

    const validate = (values: any) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Zorunlu alan';
        }
        if (!values.email) {
            errors.email = 'Zorunlu alan';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Geçersiz e-mail adresi';
        }
        if (!values.password) {
            errors.password = 'Zorunlu alan';
        }
        if (!values.role) {
            errors.role = 'Zorunlu alan';
        }

        return errors;
    }

    const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            role: user?.role || ''
        },
        validate,
        onSubmit: values => {
            console.log(values);
            setLoadingSpinner(true);
            axios.put(`/api/users/update/${user.uid}`, values).then(res => {
                //console.log({res: res.data})
                setFieldValue('name', '')
                setFieldValue('email', '')
                setFieldValue('password', '')
                setFieldValue('role', '')
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
        },
    });


    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length > 7) strength += 25
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25
        if (password.match(/\d/)) strength += 25
        if (password.match(/[^a-zA-Z\d]/)) strength += 25
        return strength
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        setPasswordStrength(calculatePasswordStrength(newPassword))
        handleChange(e)
    }
    const togglePasswordVisibility = () => {

        setPasswordSee(see => !see)
    }

    return (
        <>
            {
               <Dialog open={open} onOpenChange={selfClose}>

                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Full Ad
                                    </Label>
                                    <Input
                                        id="name"
                                        //defaultValue="Pedro Duarte"
                                        className="col-span-3"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.name ? errors.name : null}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        //defaultValue="@peduarte"
                                        className="col-span-3"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email ? errors.email : null}
                                <div className="grid grid-cols-4  items-center gap-4">
                                    <Label htmlFor="password" className="col-span-1 text-right">Password</Label>
                                    <div className="relative col-span-3 flex flex-col">
                                        <div>
                                            <Input
                                                id="password"
                                                type={passwordSee ? "text" : "password"}
                                                value={values.password}
                                                onChange={handlePasswordChange}
                                                required
                                                className="pr-10"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={togglePasswordVisibility}
                                                aria-label={!passwordSee ? "Hide password" : "Show password"}
                                            >
                                                {!passwordSee ? (
                                                    <EyeOffIcon className="h-4 w-4" />
                                                ) : (
                                                    <EyeIcon className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                                {errors.password ? errors.password : null}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password_length" className="col-span-1 text-right flex justify-center items-center">
                                        <span className="mr-5">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Info color="gray" className="align-middle" size={16} />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px]">
                                                    <p className="text-sm text-muted-foreground">Password Strength</p>
                                                </PopoverContent>
                                            </Popover>
                                        </span>
                                        <span className="">
                                            {passwordStrength === 100 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
                                        </span>

                                    </Label>
                                    <div className="relative col-span-3 flex flex-col">
                                        <Progress value={passwordStrength} className="h-2 w-full block" color="black" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">
                                        Role
                                    </Label>
                                    <Select value={values.role} onValueChange={(val) => setFieldValue('role', val)} >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Role seçin</SelectLabel>
                                                <SelectItem value="User">User</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                                <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {errors.role ? errors.role : null}
                            </div>
                        </form>
                        <DialogFooter>
                            <Button type="submit" onClick={() => {
                                handleSubmit()
                            }}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}
