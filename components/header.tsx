import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  console.log(user);
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="flex items-center bg-white px-6 sticky top-0 z-50 backdrop-blur-md border-b ">
      <nav className="mx-auto py-4 px-4 w-full flex items-center justify-between">
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="text-2xl font-bold"
        >
          DriveWise
          {isAdmin && <span className="">ADMIN</span>}
        </Link>

        <div className="flex space-x-4">
          {isAdminPage ? (
            <>
              <Link href={"/"}>
                <Button variant={"outline"} className="">
                  <ArrowLeft />
                  <span>Back to App</span>
                </Button>
              </Link>{" "}
            </>
          ) : (
            <SignedIn>
              {!isAdmin && (
                <Link
                  href={"/reservations"}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Button variant={"outline"}>
                    <CarFront />
                    <span className="">My Reservations</span>
                  </Button>
                </Link>
              )}
              <Link href="/saved-cars">
                <Button className="flex items-center gap-2 cursor-pointer">
                  <Heart />
                  <span className="">Saved Cars</span>
                </Button>
              </Link>

              {isAdmin && (
                <Link href={"/admin"}>
                  <Button
                    className="flex items-center gap-2 cursor-pointer"
                    value={"outline"}
                  >
                    <Layout />
                    <span className="">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            {!isAdminPage && (
              <SignInButton forceRedirectUrl={"/"}>
                <Button variant={"outline"} className="cursor-pointer">
                  Login
                </Button>
              </SignInButton>
            )}
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-20 w-20",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
