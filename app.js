const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co"
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8"


const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

// collecting data

let submitBtn = document.querySelector("#submitBtn")
let studentNames = document.querySelector("#student")
let course = document.querySelector("#course")
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
if (window.location.pathname.endsWith ("/allstudent.html")) {
    console.log("hello")
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
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">${student.name}</h2>
                    <h4 class="card-title">${student.course}</h4>
                    <p class="card-text">${student.email_address}</p>

                    <button onclick="update(${student.id})" class="btn editBtn">Edit</button>
                    <button onclick="removeStudent(${student.id})" class="btn dltBtn">Delete</button>
                </div>
            </div>
        </div>
    `;
            });

            window.update = async (id) => {

                const { data } = await client
                    .from('students_data')
                    .select()
                    .eq("id", id)
                console.log(data);

                let { name, course, email_address } = data[0];
                console.log(name, course, email_address)
                const { value: formValues } = await Swal.fire({
                    title: "Edit Student Data",
                    html: `
   Name: <input id="swal-input1" class="swal2-input" value=${name}>
   Course: <input id="swal-input2" class="swal2-input" value=${course}>
   Email: <input id="swal-input3" class="swal2-input" value=${email_address}>
  `,
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById("swal-input1").value,
                            document.getElementById("swal-input2").value,
                            document.getElementById("swal-input3").value
                        ];
                    },
                });
                console.log(formValues);

                const updateData = {
                    name: formValues[0],
                    course: formValues[1],
                    email_address: formValues[2]

                }
                const { error } = await client
                    .from('students_data')
                    .update(updateData)
                    .eq('id', id)
                    location.reload();
            };
            window.removeStudent = async (studentId) => {
                console.log("delete")
                const response = await client
                    .from('students_data')
                    .delete()
                    .eq('id', studentId)
location.reload();
            };

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