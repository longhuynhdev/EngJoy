"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface LoginResponse {
  user: string;
  email: string;
  role: string;
  tokenType: string;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data: LoginResponse = await response.json();
      console.log("Login successful:", data);
      //TODO Handle successful login (e.g., redirect, store token, etc.)
    } else {
      console.error("Login failed");
      //TODO Handle login failure
    }
  };
  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                placeholder="example@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-left">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleSubmit}>
          Login
        </Button>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="w-full" onClick={() => window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8080/api/v1/auth/googlegrantcode&response_type=code&client_id=316346812823-emelg3dhg9a9tiis7b5bfjnk8clv8mc9.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline"}>
            Sign in with Google
            </Button>
          <Button variant="outline" className="w-full">
            Sign in with Microsoft
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
