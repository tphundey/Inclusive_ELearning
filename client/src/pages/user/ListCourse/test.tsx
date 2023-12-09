import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import axios from 'axios';
import { Slider } from 'antd';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';

const ListCourse = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categories2, setCategories2] = useState<any[]>([]);
  const [categories3, setCategories3] = useState<any[]>([]);
  const [mappedCategoryNames, setMappedCategoryNames] = useState<any[]>([]);
  const [visibleCourses, setVisibleCourses] = useState(4);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/Courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await Axios.get('http://localhost:3000/Categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories2(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const categoryIdsToMap = ['6570915fe04745af0164e622', '6570916be04745af0164e625', '6571e7a4900b07f0abe9b752'];

  useEffect(() => {
    const mappedNames = categoryIdsToMap.map(categoryId => {
      const category = categories.find(c => c.id === categoryId);
      return category ? category.categoryName : 'Unknown Category';
    });

    setMappedCategoryNames(mappedNames);
  }, [categories2]);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories3(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCourses(prevVisibleCourses => prevVisibleCourses + 4);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    filterCoursesByPrice(value);
  };

  const filterCoursesByPrice = (range) => {
    const filtered = courses.filter(course => course.price >= range[0] && course.price <= range[1]);
    setFilteredCourses(filtered);
  };

  return (
    <div className="containerCss-browepage2 business">
      <div>
        <h3>Price Range:</h3>
        <Slider
          range
          min={0}
          max={100}
          defaultValue={[0, 100]}
          onChange={handlePriceChange}
        />
      </div>
      <h2 className='h2-bsn'>Business</h2>
      <br />
      <h2 className='h2-bsn2'>Role Guides</h2>
      <span className='sp1-bsn'>Explore foundational content and tools to help you understand, learn, and improve at the skills involved in trending industry roles.</span>
      <hr />

      <div className="listbsn">
        {mappedCategoryNames.map((name, index) => (
          <div key={index} className="bsn-children">
            <a href="">{name}</a>
          </div>
        ))}
      </div>

      <div className="bsn-flex-h2">
        <div> <h2 className='h2-bsn2'>Learning Paths</h2></div>
      </div>
      <hr />

      <div className="listpro-one">
        {filteredCourses.length > 0 ? (
          filteredCourses.slice(0, visibleCourses).map((course) => (
            <div key={course.id} className='ty-contai'>
              {/* Hiển thị thông tin khóa học */}
              <div className="courseProgress">
                <div className="imgCoureProgress">
                  <img src={course.courseIMG} alt="" />
                </div>
                <div className="infoCourseProgress">
                  <h3>COURSE</h3>
                  <a href={`/introduction/${course.id}`}> <h2>{course.courseName}</h2></a>
                  <div>
                    {formatCurrency(course.price)}
                  </div>
                  <div className="fl-info-progress">
                    <div className="fl1-info-progress">
                      <img className='mt-1' src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg" alt="" />
                    </div>
                    <div className="fl2-info-progress">
                      LinkedIn - By: Trần Phùng
                    </div>
                  </div>
                </div>
              </div>
              <div className="option-course-progress">
                <div className="dropdown dropdown-right dropdown-end mt-5">
                  <label tabIndex={0} className="btn m-1"><i className="fa-solid fa-ellipsis"></i></label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 right-0 mt-8">
                    {/* <li><a onClick={() => handleAddToCollections(course.id)}>Add to collections</a></li>
                      <li><a onClick={() => handleMoveToHistory(course.id)}>Move to history</a></li>
                      <li><a onClick={() => handleRemoveCourse(course.id)}>Remove</a></li>  */}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}

        {courses.length > visibleCourses && (
          <button className="show-more-button font-bold" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default ListCourse;


<div className="listbsn">
{mappedCategoryNames.map((name, index) => (
    <div key={index} className="bsn-children">
        <a href="http://localhost:5173/listcourse/{id}">{name}</a>
    </div>
))}

</div>