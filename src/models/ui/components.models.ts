import { Dispatch } from "react"

export interface InputModel extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface DropdownModel extends React.SelectHTMLAttributes<HTMLSelectElement> {
    data: any[],
    selectItem?: any
}

export interface ButtonModel extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    background: string,
    size?: 'sm' | 'md' | 'lg' | 'xl'
}