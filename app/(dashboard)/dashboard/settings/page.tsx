"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: "Username must be at least 2 characters.",
		})
		.max(30, {
			message: "Username must not be longer than 30 characters.",
		}),
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(100, {
			message: "Name must not be longer than 100 characters.",
		}),
	email: z
		.string({
			required_error: "Please select an email to display.",
		})
		.email(),
	bio: z.string().max(500, {
		message: "Bio must not be longer than 500 characters.",
	}),
	nationalId: z
		.string()
		.min(10, {
			message: "National ID must be exactly 10 characters.",
		})
		.max(10, {
			message: "National ID must be exactly 10 characters.",
		}),
	phone: z
		.string()
		.min(10, {
			message: "Phone must be at least 10 characters.",
		})
		.max(15, {
			message: "Phone must not be longer than 15 characters.",
		}),
	urls: z
		.array(
			z.object({
				value: z.string().url({ message: "Please enter a valid URL." }),
			}),
		)
		.optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database
const defaultValues: Partial<ProfileFormValues> = {
	name: "امیر رضا موذنی",
	nationalId: "0640461514",
	bio: "I own a computer.",
	urls: [
		{ value: "https://shadcn.com" },
		{ value: "http://twitter.com/shadcn" },
	],
};

export default function SettingsPage() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});

	function onSubmit(data: ProfileFormValues) {
		console.log("Profile data:", data);
		toast.success("Profile updated successfully!", {
			description: "Your profile has been updated.",
		});
	}

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Profile</h3>
				<p className="text-sm text-muted-foreground">
					This is how others will see you on the site.
				</p>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="flex items-center gap-6">
						<Avatar className="h-20 w-20">
							<AvatarImage src="/user-logo.png" alt="امیر رضا موذنی" />
							<AvatarFallback>ام</AvatarFallback>
						</Avatar>
						<div className="space-y-2">
							<Label htmlFor="picture">Profile Picture</Label>
							{/* <Button variant="outline" size="sm" className="w-fit">
								<Camera className="mr-2 h-4 w-4" />
								Change Picture
							</Button> */}
						</div>
					</div>
					<div className="grid gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input disabled placeholder="AmirReza" {...field} />
									</FormControl>
									{/* <FormDescription>
										This is your public display name. It can be your real name
										or a pseudonym.
									</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled placeholder="امیر رضا موذنی" {...field} />
									</FormControl>
									{/* <FormDescription>
										This is your public display name. It can be your real name
										or a pseudonym.
									</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="nationalId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>NationalId</FormLabel>
									<FormControl>
										<Input disabled placeholder="0640461514" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input disabled placeholder="john.doe@example.com" {...field} />
								</FormControl>
								{/* <FormDescription>
									You can manage verified email addresses in your{" "}
									<a
										href="/dashboard/settings/email"
										className="underline underline-offset-4"
									>
										email settings
									</a>
									.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea
									disabled
										placeholder="Tell us a little bit about yourself"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>
									You can <span>@mention</span> other users and organizations to
									link to them.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <Button type="submit">Update profile</Button> */}
				</form>
			</Form>
		</div>
	);
}