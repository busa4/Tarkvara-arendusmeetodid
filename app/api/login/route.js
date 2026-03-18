import { NextResponse } from "next/server";

const USER = { login: "admin", password: "1234" }; 

export async function POST(req) {
    const {login, password} = await req.json()

    if(login == USER.login && password == USER.password){
        const res = NextResponse.json({ok: true})

        res.cookies.set("session", "abc123", {
            maxAge: 60 * 60 * 24,
            path: "/"
        })
        return res;
    }
    else{
          return NextResponse.json({ ok: false, error: "Not Correct" }, { status: 401 });

    }
    
}