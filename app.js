const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co"
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8"


const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

// collecting data

let submitBtn = document.querySelector("#submitBtn")
let studentNames = document.querySelector("#stu")
let course = document.querySelector("#cou")
let email = document.querySelector("#email")

submitBtn && submitBtn.addEventListener("click", async (event) => {

    try {
        event.preventDefault()

        if (!studentNames.value || !course.value || !email.value) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "fill your data",

            });
            return
        }

        const { error } = await client
            .from('students_data')
            .insert([{
                name: studentNames.value,
                course: course.value,
                email_address: email.value,

            }])

        Swal.fire({
            title: "student added succuccesfully !",
            icon: "success",
            draggable: true
        });
        console.log(error)
    }
    catch (error) {
        console.log(error)
    }

    studentNames.value = "";
    course.value = "";
    email.value = "";
})

// getAlldata
if (window.location.pathname == "/allstudent.html") {
    const getAllData = async () => {
        try {
            const { data, error } = await client
                .from('students_data')
                .select()

            let studentData = document.getElementById("students")
            console.log(data);
            console.log(error);

            // card section
            data.forEach((student) => {
                studentData.innerHTML += `
                <div class=" col-md-4 card mb-3 " style="width: 18rem;">
  <div class="card-body">
      <h1 class="card-title">${student.name}</h1>
    <h1 class="card-title">${student.course}</h1>
    <p class="card-text">${student.email_address}</p>
    <button onclick = update()><a href="#" class="btn" >Edit</a></button>
    <button onclick =()><a href="#" class="btn" >Delete</a></button>
  </div>
</div>`;

            });

            window.update = async(id) => {
                const { error } = await supabase
                    .from('students_data')
                    .update({ name: 'piano' })
                    .eq('id', id)
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    getAllData();
}




// getOne

// const getOne = async()=>{
//    try{
//      const { data, error } = await client
//   .from('students_data')
//   .select().eq("name","khadija")
//   console.log(data);
//   console.log(error);
//    }
//    catch(error){
//     console.log(error);
//    }
// }
// getOne()

// justName

// const justName = async()=>{
//    try{
//      const { data, error } = await client
//   .from('students_data')
//   .select("name")
//   console.log(data);
//   console.log(error);
//    }
//    catch(error){
//     console.log(error);
//    }
// }

// justName()