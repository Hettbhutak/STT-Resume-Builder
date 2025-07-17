import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        if (resp) {
          setLoading(false);
          setOpenDialog(false);
          navigation("/dashboard/resume/" + resp.data.data.documentId + "/edit");
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      {/* 🚀 **Improved Button Styling** */}
      <div
        className="flex flex-col items-center justify-center w-full h-48 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-400 dark:border-gray-600 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="text-blue-500" size={48} />
        <p className="text-gray-700 dark:text-gray-300 mt-2 font-semibold">Create New Resume</p>
      </div>

      {/* 🚀 **Dialog Box Styling** */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Add a name for your resume
            </DialogDescription>

            {/* 🚀 **Input Styling** */}
            <Input
              className="mt-4 p-3 text-gray-900 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex. React Resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />

            {/* 🚀 **Buttons Section** */}
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md text-white flex items-center gap-2"
                onClick={onCreate}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
