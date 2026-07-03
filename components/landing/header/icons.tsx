import type {SVGProps} from "react";
import Image from "next/image";

export function SearchIcon() {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            fill="none"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.75 15.75L12.4875 12.4875M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export function ChevronDownIcon() {
    return (
        <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
            <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export function ChevronRightIcon() {
    return (
        <Image src={"/svg/chevron-right.svg"} alt={"Chevron Right"} width={24} height={24} />
    );
}

export function ArrowUpRightIcon({width = 24, height = 24}: { width?: number; height?: number }) {
    return (
        <svg aria-hidden="true" fill="none" height={height}
             viewBox={`0 0 ${width} ${height}`}
             width={width}>
            <path
                d="M7 17L17 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <path
                d="M8 7H17V16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export function NextOutlineIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="56"
            viewBox="0 0 56 56"
            width="56"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M28 1C42.9117 1 55 13.0883 55 28C55 42.9117 42.9117 55 28 55C13.0883 55 1 42.9117 1 28C1 13.0883 13.0883 1 28 1Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M29.293 21.293C29.6835 20.9025 30.3165 20.9025 30.707 21.293L36.707 27.293C37.0976 27.6835 37.0976 28.3166 36.707 28.7071L30.707 34.7071C30.3165 35.0976 29.6835 35.0976 29.293 34.7071C28.9024 34.3166 28.9024 33.6835 29.293 33.293L33.5859 29H20C19.4477 29 19 28.5523 19 28C19 27.4478 19.4477 27 20 27H33.5859L29.293 22.7071C28.9024 22.3166 28.9024 21.6835 29.293 21.293Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function PrevOutlineIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="56"
            viewBox="0 0 56 56"
            width="56"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M28 1C42.9117 1 55 13.0883 55 28C55 42.9117 42.9117 55 28 55C13.0883 55 1 42.9117 1 28C1 13.0883 13.0883 1 28 1Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M36 28H20M26 22L20 28L26 34"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}
