import "@/app/globals.css";
import * as Commerce from "commerce-kit";
import { Nav } from "@/ui/nav/nav";
import { JsonLd, accountToWebsiteJsonLd } from "@/ui/json-ld";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { Footer } from "@/ui/footer/footer";

export default async function StoreLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	const accountResult = await Commerce.accountGet();
	const logoLink =
		accountResult?.logo?.links?.data.find((link) => !link.expired) ||
		(accountResult?.logo?.id ? await Commerce.fileGet(accountResult.logo.id) : null);

	return (
		<>
			<Nav />
			<TooltipProvider>
				<main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8">
					{children}
					{modal}
				</main>
				<Footer />
			</TooltipProvider>
			<JsonLd
				jsonLd={accountToWebsiteJsonLd({
					account: accountResult?.account,
					logoUrl: logoLink?.url,
				})}
			/>
		</>
	);
}
