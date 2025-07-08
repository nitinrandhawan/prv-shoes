import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateSubcategory = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [allCategory, setAllCategory] = useState([]);
  const [form, setForm] = useState({
    category: '',
    subcategory: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch all categories & the subcategory itself
  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          axios.get('/api/category'),
          axios.get(`/api/subcategory/${_id}`),
        ]);
        setAllCategory(catRes.data.data);
        const sub = subRes.data.data;
        setForm({
          category: sub.category._id,            // populated on backend
          subcategory: sub.subcategory,
        });
        setPreview(sub.subcategoryImage || null);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load data');
      }
    };
    load();
  }, [_id]);

  // Unified change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        toast.error('Image must be ≤ 2 MB');
        e.target.value = null;
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.subcategory) {
      return toast.error('Please fill all fields');
    }
    const fd = new FormData();
    fd.append('category', form.category);
    fd.append('subcategory', form.subcategory);
    if (imageFile) fd.append('image', imageFile);

    const id = toast.loading('Updating…');
    try {
      const res = await axios.put(`/api/subcategory/${_id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.status === 200) {
        toast.success('Updated successfully', { id });
        navigate('/admin/subcategory');
      } else {
        toast.error('Update failed', { id });
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error', { id });
    }
  };

  return (
    <>
      <div className="blue_bg mt-5">
        <h2 className="text-center mb-5">Edit Subcategory</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ marginTop: -35 }}>
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label>Category <span className="text-danger">*</span></label>
                <select
                  name="category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">— Select —</option>
                  {allCategory.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Subcategory Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="subcategory"
                  className="form-control"
                  value={form.subcategory}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Image </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {preview && (
                <div className="mb-3">
                  <label>Preview</label>
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: 150 }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn text-light w-100 mt-2 mb-3"
                style={{ backgroundColor: '#183661' }}
              >
                Update Subcategory
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubcategory;
