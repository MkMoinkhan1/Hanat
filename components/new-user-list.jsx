"use client";
import { CircleCheck, Trash2 } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import EditIcon from "@/public/images/Edit-icon.png";
import { useEffect, useState } from "react";
import { EditUserDrawer } from "./edit-user-dialog";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useUsersStore } from "@/store/editStore";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const NewUserList = ({ newUserData }) => {
  const {locale} = useParams()
  const t = useTranslations("HomePage")
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {items , setItems , editItem , removeItem } = useUsersStore()
  useEffect(()=>{
    setItems(newUserData)
    
  },[newUserData])
  console.log("New User Data:", newUserData);
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleDeleteUser = (user) => {
    removeItem(user.id);
    toast({
      title: "User deleted",
      description: `${user.name}'s information has been deleted successfully.`,
    });
  };
  const handleSaveUser = (updatedUser) => {
    editItem(updatedUser)
    toast({
      title: "User updated",
      description: `${updatedUser.name}'s information has been updated successfully.`,
    });
  };
  return (
    <Card className="lg:col-span-2 max-h-[20rem] overflow-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="2xl:text-sm text-xs font-medium">
          {t('new_user')}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-blue-600 h-7 px-2"
          onClick={() => router.push(`/${locale}/admin/users`)}
        > 
          {t('view_all')}
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          {items?.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-[45%]">
                <Avatar>
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium 2xl:text-sm text-xs">
                      {user.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-600 hover:bg-blue-50 text-xs font-normal"
                    >
                      {t('new')}
                    </Badge>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-muted-foreground rounded-md gap-0.5 px-1.5 text-xs"
              >
                <CircleCheck className="fill-green-500 dark:fill-green-400 w-[13px] h-[13px] text-white" />
                {t('active')}{" "}
              </Badge>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleEditUser(user)}
                >
                  <Image
                    src={EditIcon}
                    className="h-4 w-4 filter contrast-50 "
                    alt="edit icon"
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleDeleteUser(user)}
                >
                  <Trash2 className="h-4 w-4 text-gray-400 " />
                </Button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center text-gray-500">{t('no_found')}.</div>
          )}
        </div>
      </CardContent>
      {/* Edit User Drawer */}
      <EditUserDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveUser}
      />
      <Toaster />
    </Card>
  );
};

export default NewUserList;
