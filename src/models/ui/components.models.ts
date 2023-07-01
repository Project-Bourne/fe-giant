import { Dispatch } from "react"

export interface InputModel extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface DropdownModel extends React.SelectHTMLAttributes<HTMLSelectElement> {
    data: any[],
    selectItem?: any,
    className?: any,
    style?: any
}

export interface ButtonModel extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    background: string,
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface CustomSwitchType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   styles?: any,
   title: string,
   content: string
}