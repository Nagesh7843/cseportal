import React, { useState } from 'react';
import { UploadAsset } from '@/types';

interface UploadAssetModalProps {
  isOpen: boolean;
  isAssignmentMode: boolean;
  onClose: () => void;
  onAddAsset: (asset: UploadAsset) => void;
}

export const UploadAssetModal: React.FC<UploadAssetModalProps> = ({
  isOpen,
  isAssignmentMode,
  onClose,
  onAddAsset
}) => {
  const [assetName, setAssetName] = useState('');
  const [assetCategory, setAssetCategory] = useState<'Assignment' | 'Material' | 'Syllabus'>(
    isAssignmentMode ? 'Assignment' : 'Material'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assetName.trim()) {
      const newAsset: UploadAsset = {
        id: `up-${Date.now()}`,
        name: assetName.endsWith('.pdf') || assetName.endsWith('.zip') ? assetName : `${assetName}.pdf`,
        category: assetCategory,
        date: 'Just now',
        status: 'Published',
        fileSize: '4.2 MB',
      };
      onAddAsset(newAsset);
      setAssetName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c5d4]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[18px] text-[#071e27]">
            {isAssignmentMode ? 'Upload Assignment' : 'Upload Study Material'}
          </h3>
          <button onClick={onClose} className="text-[#767683]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">File Name</label>
            <input
              type="text"
              required
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="e.g. Distributed_Systems_Lab3_Brief.pdf"
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none focus:ring-2 focus:ring-[#000666]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#454652] uppercase mb-1">Category</label>
            <select
              value={assetCategory}
              onChange={(e) => setAssetCategory(e.target.value as any)}
              className="w-full border border-[#c6c5d4] rounded-xl p-3 text-[13px] outline-none font-semibold text-[#071e27]"
            >
              <option value="Assignment">Assignment</option>
              <option value="Material">Material</option>
              <option value="Syllabus">Syllabus</option>
            </select>
          </div>

          <div className="border-2 border-dashed border-[#c6c5d4] rounded-xl p-6 text-center bg-[#f3faff]">
            <span className="material-symbols-outlined text-[32px] text-[#2b5bb5] mb-1">cloud_upload</span>
            <p className="text-[12px] font-bold text-[#071e27]">Drag and drop document files here</p>
            <p className="text-[10px] text-[#767683] mt-1">Supports PDF, ZIP, PPTX (Max 25MB)</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c6c5d4] rounded-lg text-[13px] font-semibold text-[#071e27]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#000666] text-white rounded-lg text-[13px] font-bold hover:bg-[#1a237e]"
            >
              Upload & Publish Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
