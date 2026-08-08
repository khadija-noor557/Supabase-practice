const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co"
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8"


const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

// collecting data

let submit = document.querySelector("#submitBtn")

let studentNames = document.querySelector("#stu")
let course = document.querySelector("#cou")
let email = document.querySelector("#email")


submit.addEventListener("click", async (event) => {
    try {
        event.preventDefault()

        const { error } = await client
            .from('students_data')
            .insert([{
                name: studentNames.value,
                course: course.value,
                email_address: email.value,

            }])
            console.log(error)
    }
    catch (error) {
        console.log(error)
    }
})