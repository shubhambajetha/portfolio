import FifthSection from "../components/homepage/FifthSection";
import { getalllistings } from "../services/productapi";

export default async function ProjectsPage() {
  const response = await getalllistings();
  return <FifthSection projectdata={response.data ?? []} />;
}
