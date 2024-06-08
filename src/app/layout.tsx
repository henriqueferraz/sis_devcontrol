import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dev Controle",
	description: "Gerencie seus clientes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<AuthProvider>
					<ModalProvider>
						<Header />
						{children}
					</ModalProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
