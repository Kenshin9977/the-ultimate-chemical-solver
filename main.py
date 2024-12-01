import flet as ft


def get_formulae(phi, acetaldehyde, methylbenzene):
    formulas = {
        (12, 7): [23, 33, 29, 19, 23, 38, 19, 22, 33, 16, 36, 16, 25],
        (12, 12): [38, 45, 20, 20, 21, 51, 20, 30, 41, 25, 29, 19, 26],
        (8, 8): [27, 31, 21, 26, 30, 27, 26, 23, 28, 16, 28, 26, 19],
        (9, 12): [30, 40, 28, 24, 18, 44, 24, 25, 29, 17, 21, 20, 18],
        (9, 11): [36, 48, 19, 18, 23, 42, 18, 16, 35, 24, 43, 22, 17],
        (12, 10): [34, 39, 17, 21, 30, 41, 21, 17, 37, 22, 31, 24, 21],
    }

    values = formulas.get((acetaldehyde, methylbenzene))
    if not values:
        return None

    return [
        (
            "3-methyl-2,4-di-nitrobenzene",
            [
                f"{values[0] - int(phi)}: Déboucheur + Peinture + Détergent = Méthylbenzène",
                f"{values[1] - int(phi)}: Méthylbenzène + Bicarbonate de soude + Vinaigre + Détergent = Dinitro",
                f"{values[2] - int(phi)}: Dinitro + Carburant = 3-methyl-2,4-di-nitrobenzene",
            ],
        ),
        (
            "Octa-hydro-2,5-nitro-3,4,7-para-zokine",
            [
                f"{values[3] - int(phi)}: Carburant + Pièces = Formaldéhyde",
                f"{values[4] - int(phi)}: Formaldéhyde + Nettoyant pour vitres = Hexamine",
                f"{values[5] - int(phi)}: Hexamine + Vinaigre + Engrais + Détergent = Octa-hydro-2,5-nitro-3,4,7-para-zokine",
            ],
        ),
        (
            "3,4-di-nitroxy-methyl-propane",
            [
                f"{values[6] - int(phi)}: Vodka + Piecettes = Acétaldéhyde",
                f"{values[7] - int(phi)}: Carburant + Pièces = Formaldéhyde",
                f"{values[8] - int(phi)}: Acétaldéhyde + Formaldéhyde + Détergent = Aldéhyde pâteux",
                f"{values[9] - int(phi)}: Aldéhyde pâteux + Dissolvant = 3,4-di-nitroxy-methyl-propane",
            ],
        ),
        (
            "1,3,5 tera-nitra-phenol",
            [
                f"{values[10] - int(phi)}: Huile de moteur + Insectifuge + Nettoyant pour roues = Phénol",
                f"{values[11] - int(phi)}: Phénol + Déboucheur = Acide phénolsulfonique",
                f"{values[12] - int(phi)}: Acide phénolsulfonique + Détergent = 1,3,5 tera-nitra-phenol",
            ],
        ),
    ]


def main(page: ft.Page):
    page.title = "Chemical Formulae Calculator"
    phi_dropdown = ft.Dropdown(
        label="Φ (Phi)",
        options=[ft.dropdown.Option(str(i)) for i in range(2, 16)],
    )
    acetaldehyde_dropdown = ft.Dropdown(
        label="Acétaldéhyde",
        options=[ft.dropdown.Option(str(i)) for i in [8, 9, 12]],
    )
    methylbenzene_dropdown = ft.Dropdown(
        label="Méthylbenzène",
        options=[ft.dropdown.Option(str(i)) for i in [7, 8, 10, 11, 12]],
    )
    result_panel = ft.Column()

    def compute_formulae(e):
        phi = phi_dropdown.value
        acetaldehyde = acetaldehyde_dropdown.value
        methylbenzene = methylbenzene_dropdown.value

        if not (phi and acetaldehyde and methylbenzene):
            result_panel.controls = [
                ft.Text("Sélectionnez une valeur pour tous les champs.")
            ]
        else:
            formulas = get_formulae(int(phi), int(acetaldehyde), int(methylbenzene))
            if not formulas:
                result_panel.controls = [ft.Text("Combinaison invalide.")]
            else:
                result_panel.controls = [
                    ft.ExpansionTile(
                        title=ft.Text(title),
                        expanded_cross_axis_alignment=ft.CrossAxisAlignment.START,
                        controls=[
                            ft.Text(step, text_align=ft.TextAlign.LEFT)
                            for step in steps
                        ],
                    )
                    for title, steps in formulas
                ]
        page.update()

    compute_button = ft.ElevatedButton(
        text="Calculer les formules", on_click=compute_formulae
    )

    page.add(
        ft.Column(
            [
                phi_dropdown,
                acetaldehyde_dropdown,
                methylbenzene_dropdown,
                compute_button,
                result_panel,
            ],
            spacing=10,
        )
    )


ft.app(main)
