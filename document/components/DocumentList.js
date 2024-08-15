import Link from 'next/link';

export default function DocumentList({ documents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <Link href={`/documents/${doc.id}`} key={doc.id} className="block">
          <div className="bg-primary p-4 rounded-lg hover:bg-secondary transition duration-300">
            <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
            <p className="text-sm text-gray-300">{doc.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}