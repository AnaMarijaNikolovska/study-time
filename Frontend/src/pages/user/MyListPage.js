import {useAccessTokenState} from "../../context/AccessTokenContext";
import {useEffect, useState} from "react";
import {DetachCourse, ListUserCoursers} from "../../services/UserService";
import CourseCard from "../../components/CourseCard";

export default function MyListPage() {
    const {authUser} = useAccessTokenState();
    const [userCourses, setUserCourses] = useState(null);
    const [toggleRefresh, setToggleRefresh] = useState(false);

    useEffect(() => {
        if (!authUser) {
            return;
        }

        ListUserCoursers(authUser.id)
            .then(r => setUserCourses(r.data))
    }, [authUser, toggleRefresh])

    const RemoveFromMyList = (courseId) => {

        DetachCourse(authUser.id, courseId)
            .then(() => setToggleRefresh(!toggleRefresh))
    }

    return (
        userCourses && userCourses.length > 0 ?
            <>
                {userCourses.map((course, index) => <CourseCard setRemoveFromMyList={RemoveFromMyList} key={index}
                                                                course={course}/>)}
            </>
            : <>You haven't added anything in your list yet.</>
    )
}