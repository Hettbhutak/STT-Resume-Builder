import { Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiFileText, FiMoreVertical } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";
import { Loader2, PlusSquare } from "lucide-react";

function ResumeCardItem({ resume,refreshData }) {
  const navigation = useNavigate();
  const [openAlert,setOpenAlert]=useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = ()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
    })
    .finally(() => setLoading(false));
  }

  return (
    <div className="h-48 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 transition-transform transform hover:scale-105 flex flex-col justify-between">
      {/* Resume Icon & Options */}
      <div className="flex justify-between items-center">
        <FiFileText className="text-blue-500" size={32} />
       

        <DropdownMenu>
        <DropdownMenuTrigger>
        <FiMoreVertical className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={()=>navigation(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation(`/myResume/${resume.documentId}/view`)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation(`/myResume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete Resume from your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}  disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      </div>

      {/* Resume Name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
        {resume.title}
      </h3>

      {/* Metadata */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
      

        {/* Edit Button (Inside Link) */}
          <button className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition" onClick={()=>navigation(`/dashboard/resume/${resume.documentId}/edit`)}>
            Edit
          </button>
      

          {/* Delete Button */}
          <button className="w-full py-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-600 transition" onClick={()=>navigation(`/myResume/${resume.documentId}/view`)}>
          Download
        </button>
      </div>
    </div>
  );
}

export default ResumeCardItem;
