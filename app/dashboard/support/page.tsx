"use client";

import {
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
  Clock3,
  FileQuestion,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Support Center
        </h1>

        <p className="mt-2 text-muted-foreground">
          Need help? Contact our support team or browse frequently asked
          questions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">



        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">

            <div className="rounded-full bg-blue-500/10 p-4">
              <Mail className="h-8 w-8 text-blue-500" />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Email Support
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                bekbolatjabbarbergenov@gmail.com

              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
            >
              Send Email
            </Button>

          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">

            <div className="rounded-full bg-green-500/10 p-4">
              <Phone className="h-8 w-8 text-green-500" />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Phone
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                +998 99 955 77 66
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
            >
              Call Now
            </Button>

          </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <Card>

          <CardContent className="p-6">

            <div className="mb-6 flex items-center gap-3">

              <LifeBuoy className="h-6 w-6 text-primary" />

              <h2 className="text-xl font-semibold">
                Frequently Asked Questions
              </h2>

            </div>

            <div className="space-y-5">

              <div className="rounded-lg border p-4">

                <div className="flex items-center gap-2">

                  <FileQuestion className="h-4 w-4 text-primary" />

                  <h3 className="font-medium">
                    How do I create a product?
                  </h3>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Open the Products page and click the
                  <span className="font-medium"> New Product </span>
                  button.
                </p>

              </div>

              <div className="rounded-lg border p-4">

                <div className="flex items-center gap-2">

                  <FileQuestion className="h-4 w-4 text-primary" />

                  <h3 className="font-medium">
                    How do I update my profile?
                  </h3>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Go to Profile and update your company or personal
                  information.
                </p>

              </div>

              <div className="rounded-lg border p-4">

                <div className="flex items-center gap-2">

                  <FileQuestion className="h-4 w-4 text-primary" />

                  <h3 className="font-medium">
                    Where can I view my orders?
                  </h3>

                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Navigate to Orders from the sidebar to see all active
                  and completed orders.
                </p>

              </div>

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6">

            <div className="mb-6 flex items-center gap-3">

              <ShieldCheck className="h-6 w-6 text-green-500" />

              <h2 className="text-xl font-semibold">
                Support Information
              </h2>

            </div>

            <div className="space-y-5">

              <div className="flex items-center gap-4 rounded-lg border p-4">

                <Clock3 className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary" />

                <div>

                  <p className="font-medium">
                    Working Hours
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Everyday
                  </p>

                  <p className="text-sm text-muted-foreground">
                    09:00 - 18:00
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4">

                <Mail className="h-10 w-10 rounded-full bg-blue-500/10 p-2 text-blue-500" />

                <div>

                  <p className="font-medium">
                    Email
                  </p>

                  <p className="text-sm text-muted-foreground">
                    bekbolatjabbarbergenov@gmail.com


                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4">

                <Phone className="h-10 w-10 rounded-full bg-green-500/10 p-2 text-green-500" />

                <div>

                  <p className="font-medium">
                    Phone
                  </p>

                  <p className="text-sm text-muted-foreground">
                    +998 99 955 77 66


                  </p>

                </div>

              </div>

              <Button className="w-full">

                Documentation

                <ExternalLink className="ml-2 h-4 w-4" />

              </Button>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}