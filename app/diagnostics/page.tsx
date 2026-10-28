'use client';
import {useEffect,useState} from 'react';
export default function Diagnostics(){const [n,s]=useState(0);useEffect(()=>s(1),[]);return <button onClick={()=>s(n+1)}>Client check {n}</button>}
