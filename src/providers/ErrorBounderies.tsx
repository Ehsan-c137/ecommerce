import React, { PropsWithChildren } from "react"
import { Button } from "@/components/UI/Button"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { Icons } from "@/components/Icons/icons"

interface ErroryBoundaryState {
   error: string
}

export class ErrorBoundary extends React.Component<
   PropsWithChildren<unknown>,
   ErroryBoundaryState
> {
   constructor(props: PropsWithChildren<unknown>) {
      super(props)
      this.state = { error: "" }
   }

   componentDidCatch(error: Error) {
      this.setState({ error: `${error.name}: ${error.message}` })
      console.log(error)
   }

   navigate(path: string) {
      window.location.href = path
   }

   render() {
      const { error } = this.state
      if (error) {
         return (
            <>
               <Header />
               <div className="w-[100vw] h-[100vh] flex flex-col p-8 text-center items-center justify-around">
                  <div className="w-full h-100 d-flex flex-column gap-8 justify-content-center align-items-center text-center">
                     <p className="text-titleActive uppercase">
                        Something went wrong
                     </p>
                  </div>
                  <div className="flex flex-col items-center gap-10">
                     <p>
                        <Icons.Dress />
                     </p>
                     <p
                        className="text-titleActive"
                        style={{
                           fontSize: "16px",
                        }}
                     >
                        We can&apos;t find the page you looking for, it will
                        return to the
                     </p>

                     <div className="d-flex gap-4">
                        <Button
                           className="text-titleActive"
                           intent={"primary"}
                           onClick={() => this.navigate("/")}
                        >
                           Home
                        </Button>
                        <Button
                           className="text-titleActive"
                           intent={"primary"}
                           onClick={() => window.location.reload()}
                        >
                           Refresh
                        </Button>
                     </div>
                  </div>
               </div>

               <Footer />
            </>
         )
      } else {
         return <>{this.props.children}</>
      }
   }
}
