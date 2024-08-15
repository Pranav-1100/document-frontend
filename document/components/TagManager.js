import { useState, useEffect } from 'react';
import { getTags, createTag, deleteTag, addTagToDocument, removeTagFromDocument } from '../utils/api';

export default function TagManager({ documentId }) {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [documentTags, setDocumentTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const allTags = await getTags();
      setTags(allTags);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    try {
      await createTag(newTagName);
      setNewTagName('');
      fetchTags();
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      fetchTags();
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  const handleAddTagToDocument = async (tagId) => {
    try {
      await addTagToDocument(documentId, tagId);
      // Update document tags
    } catch (error) {
      console.error('Failed to add tag to document:', error);
    }
  };

  const handleRemoveTagFromDocument = async (tagId) => {
    try {
      await removeTagFromDocument(documentId, tagId);
      // Update document tags
    } catch (error) {
      console.error('Failed to remove tag from document:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Tags</h3>
      <form onSubmit={handleCreateTag} className="mb-4">
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag name"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-accent text-white p-2 rounded">Create Tag</button>
      </form>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag.id} className="bg-gray-700 text-white p-2 rounded flex items-center">
            <span>{tag.name}</span>
            <button onClick={() => handleDeleteTag(tag.id)} className="ml-2 text-red-500">X</button>
            {documentTags.includes(tag.id) ? (
              <button onClick={() => handleRemoveTagFromDocument(tag.id)} className="ml-2 text-yellow-500">-</button>
            ) : (
              <button onClick={() => handleAddTagToDocument(tag.id)} className="ml-2 text-green-500">+</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}