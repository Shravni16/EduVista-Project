export default function getNumberOfLectures(sections){
    if(sections.length==0){
        return 0;
    }
   let lectureCount=0;
    for(const sec of sections){
        lectureCount+=sec.subSection.length;

    }
    return lectureCount;
}