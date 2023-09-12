import { PropsWithChildren, JSX } from "react";
type ButtonProps = PropsWithChildren<{
    text?: string;
}>;

const Button = (props: ButtonProps): JSX.Element => {
    return <button className={"text-[red]"}>{props.children}</button>;
}

export default Button;
